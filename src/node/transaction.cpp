// Copyright (c) 2010 Satoshi Nakamoto
// Copyright (c) 2009-2018 The Bitcoin Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include <node/transaction.h>

#include <config.h>
#include <consensus/validation.h>
#include <net.h>
#include <net_processing.h>
#include <primitives/txid.h>
#include <txmempool.h>
#include <util/validation.h>
#include <validation.h>
#include <validationinterface.h>

#include <future>

TransactionError BroadcastTransaction(const Config &config,
                                      const CTransactionRef tx,
                                      std::string &err_string,
                                      const Amount max_tx_fee, bool relay,
                                      bool wait_callback) {
    assert(g_connman);
    std::promise<void> promise;
    TxId txid = tx->GetId();
    bool callback_set = false;

    { // cs_main scope
        LOCK(cs_main);
        CCoinsViewCache &view = *pcoinsTip;
        bool fHaveChain = false;
        for (size_t o = 0; !fHaveChain && o < tx->vout.size(); o++) {
            const Coin &existingCoin = view.AccessCoin(COutPoint(txid, o));
            fHaveChain = !existingCoin.IsSpent();
        }

        bool fHaveMempool = g_mempool.exists(txid);
        if (!fHaveMempool && !fHaveChain) {
            // Push to local node and sync with wallets.
            CValidationState state;
            bool fMissingInputs;
            if (!AcceptToMemoryPool(config, g_mempool, state, std::move(tx),
                                    &fMissingInputs, false /* bypass_limits */,
                                    max_tx_fee)) {
                if (state.IsInvalid()) {
                    err_string = FormatStateMessage(state);
                    return TransactionError::MEMPOOL_REJECTED;
                }

                if (fMissingInputs) {
                    return TransactionError::MISSING_INPUTS;
                }

                err_string = FormatStateMessage(state);
                return TransactionError::MEMPOOL_ERROR;
            } else if (wait_callback) {
                // If wallet is enabled, ensure that the wallet has been made
                // aware of the new transaction prior to returning. This
                // prevents a race where a user might call sendrawtransaction
                // with a transaction to/from their wallet, immediately call
                // some wallet RPC, and get a stale result because callbacks
                // have not yet been processed.
                CallFunctionInValidationInterfaceQueue(
                    [&promise] { promise.set_value(); });
                callback_set = true;
            }
        } else if (fHaveChain) {
            return TransactionError::ALREADY_IN_CHAIN;
        }
    } // cs_main

    if (callback_set) {
        promise.get_future().wait();
    }

    if (relay) {
        RelayTransaction(txid, *g_connman);
    }

    return TransactionError::OK;
}
