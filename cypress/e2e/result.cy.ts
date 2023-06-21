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
    cy.get('[data-cy="section-title"]').as('sectionTitle');
  });

  it('should display the Result component', () => {
    cy.get('@sectionTitle').should('contain.text', 'Result');
    cy.get('[data-cy="sign-btn"]').should('contain.text', 'Sign with Simple Signer');
  });

  it('should display the Signed XDR component', () => {
    cy.get('@sectionTitle').should('contain.text', 'Signed Xdr');
    cy.get('[data-cy="send-xdr-btn"]').should('contain.text', 'Send loan');
  });
});
