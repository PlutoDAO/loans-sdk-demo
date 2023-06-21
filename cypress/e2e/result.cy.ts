import accountMock from '../fixtures/account.json';
import account from '../fixtures/testnetPublicKey.json';

const publicKey = account.key;
const stellarMockUrl = `https://horizon-testnet.stellar.org/accounts/${publicKey}`;
accountMock.account_id = publicKey;

describe('Result', () => {
  beforeEach(() => {
    cy.intercept(stellarMockUrl, { statusCode: 200, body: accountMock }).as('mockAccount');
    window.localStorage.setItem('borrower', accountMock.account_id);
    cy.visit('/');
  });

  it('should display the Result component', () => {
    cy.get('.without-loan-container > :nth-child(4)').should('contain.text', 'Result');
    cy.get(':nth-child(6) > [slot="post-input"]').should('contain.text', 'Sign with Simple Signer');
  });

  it('should display the Signed XDR component', () => {
    cy.get('.without-loan-container > :nth-child(7)').should('contain.text', 'Signed Xdr');
    cy.get('.s-Izg6ARoN1pyF').should('contain.text', 'Send loan');
  });
});
