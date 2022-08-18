/**
 * @generated by contrib/devtools/chainparams/generate_chainparams_constants.py
 */

#include <chainparamsconstants.h>

namespace ChainParamsConstants {
    const BlockHash MAINNET_DEFAULT_ASSUME_VALID = BlockHash::fromHex("000000000000000001a0203cc0e0558f6d9e44ac7c7a6614cda2a2c62ae76701");
    const uint256 MAINNET_MINIMUM_CHAIN_WORK = uint256S("0000000000000000000000000000000000000000015ef4df866dc057f52b454b");
    const uint64_t MAINNET_ASSUMED_BLOCKCHAIN_SIZE = 210;
    const uint64_t MAINNET_ASSUMED_CHAINSTATE_SIZE = 3;

    const BlockHash TESTNET_DEFAULT_ASSUME_VALID = BlockHash::fromHex("0000000000071dae683db25420d136bdec7399bc3dcfcc240d9c7ff2f38d4e17");
    const uint256 TESTNET_MINIMUM_CHAIN_WORK = uint256S("00000000000000000000000000000000000000000000006e93524733fef8914a");
    const uint64_t TESTNET_ASSUMED_BLOCKCHAIN_SIZE = 55;
    const uint64_t TESTNET_ASSUMED_CHAINSTATE_SIZE = 2;
} // namespace ChainParamsConstants

