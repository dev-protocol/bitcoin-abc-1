import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import SendToken from 'components/Send/SendToken';
import BCHJS from '@psf/bch-js';
import {
    walletWithBalancesAndTokens,
    walletWithBalancesAndTokensWithCorrectState,
} from '../../Home/__mocks__/walletAndBalancesMock';
import { WalletContext } from 'utils/context';
import { BrowserRouter as Router } from 'react-router-dom';

beforeEach(() => {
    // Mock method not implemented in JSDOM
    // See reference at https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

test('Wallet with BCH balances and tokens', () => {
    const testBCH = new BCHJS();
    const component = renderer.create(
        <WalletContext.Provider value={walletWithBalancesAndTokens}>
            <ThemeProvider theme={theme}>
                <Router>
                    <SendToken
                        tokenId={
                            'bd1acc4c986de57af8d6d2a64aecad8c30ee80f37ae9d066d758923732ddc9ba'
                        }
                        jestBCH={testBCH}
                    />
                </Router>
            </ThemeProvider>
        </WalletContext.Provider>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Wallet with BCH balances and tokens and state field', () => {
    const testBCH = new BCHJS();
    const component = renderer.create(
        <WalletContext.Provider
            value={walletWithBalancesAndTokensWithCorrectState}
        >
            <ThemeProvider theme={theme}>
                <Router>
                    <SendToken
                        tokenId={
                            'bd1acc4c986de57af8d6d2a64aecad8c30ee80f37ae9d066d758923732ddc9ba'
                        }
                        jestBCH={testBCH}
                    />
                </Router>
            </ThemeProvider>
        </WalletContext.Provider>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Without wallet defined', () => {
    const testBCH = new BCHJS();
    const withoutWalletDefinedMock = {
        wallet: {},
        balances: { totalBalance: 0 },
        loading: false,
    };
    const component = renderer.create(
        <WalletContext.Provider value={withoutWalletDefinedMock}>
            <ThemeProvider theme={theme}>
                <Router>
                    <SendToken
                        tokenId={
                            'bd1acc4c986de57af8d6d2a64aecad8c30ee80f37ae9d066d758923732ddc9ba'
                        }
                        jestBCH={testBCH}
                    />
                </Router>
            </ThemeProvider>
        </WalletContext.Provider>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});