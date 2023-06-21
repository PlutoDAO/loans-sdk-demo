import accountMock from '../fixtures/account.json';
import account from '../fixtures/testnetPublicKey.json';

const publicKey = account.key;
const shortedPublicKey = publicKey.slice(0, 5).concat('...').concat(publicKey.substr(-5));
const balance = accountMock.balances[0].balance;
const stellarMockUrl = `https://horizon-testnet.stellar.org/accounts/${publicKey}`;
accountMock.account_id = publicKey;

describe('Without loan', () => {
  beforeEach(() => {
    cy.intercept(stellarMockUrl, { statusCode: 200, body: accountMock }).as('mockAccount');
    window.localStorage.setItem('borrower', accountMock.account_id);
    cy.visit('/');
  });

  it('should display the GetLoan component', () => {
    cy.get('[data-cy="section-title"]').should('contain.text', 'Get a loan with XLM');
    cy.get('[data-cy="account-key"]').should('contain.text', shortedPublicKey);
    cy.get('.text-light').should('contain.text', 'Available');
    cy.get('.text-heavy').should('contain.text', `${balance} XLM`);
    cy.get('[data-cy="submit-btn"]').should('contain.text', 'Get Loan');
  });
});
