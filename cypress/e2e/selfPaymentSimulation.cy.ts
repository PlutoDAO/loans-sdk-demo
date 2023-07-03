import accountFundedResponseMock from '../fixtures/account.json';
import accountSignersResponseMock from '../fixtures/stellarAccountSignersResponse.json';
import feeStatsResponseMock from '../fixtures/stellarFeeStatsResponse.json';
import transactionResponseMock from '../fixtures/stellarTransactionResponse.json';
import withDebtStatusMock from '../fixtures/withDebtLoan.json';
import accountWithALoanResponseMock from '../fixtures/withLoanAccount.json';
import withoutDebtStatusMock from '../fixtures/withoutDebtLoan.json';

const USER_PUBLIC_KEY = Cypress.env('TEST_BORROWER_PUBLIC_KEY');
const VAULT_PUBLIC_KEY = Cypress.env('TEST_VAULT_PUBLIC_KEY');
const yUSDC_ISSUER = Cypress.env('YUSDC_ISSUER');

const stellarAccountUrl = 'https://horizon-testnet.stellar.org/accounts';
const loanStatusUrl = `https://test.loans-api.plutodao.finance/loan/${USER_PUBLIC_KEY}`;
const transactionsURl = 'https://horizon-testnet.stellar.org/transactions';
const accountSignersUrl = `https://horizon-testnet.stellar.org/accounts?signer=${USER_PUBLIC_KEY}`;
const stellarFeesUrl = 'https://horizon-testnet.stellar.org/fee_stats';

accountSignersResponseMock._embedded.records[0]['id'] = VAULT_PUBLIC_KEY;
accountSignersResponseMock._embedded.records[0]['account_id'] = VAULT_PUBLIC_KEY;
accountSignersResponseMock._embedded.records[0].signers[0]['key'] = VAULT_PUBLIC_KEY;

describe('Self Payment Simulation', () => {
  beforeEach(() => {
    accountWithALoanResponseMock.account_id = USER_PUBLIC_KEY;
    cy.intercept(`${stellarAccountUrl}/${USER_PUBLIC_KEY}`, {
      statusCode: 200,
      body: accountWithALoanResponseMock,
    }).as('mockBorrowerAccount');

    cy.intercept(stellarFeesUrl, { statusCode: 200, body: feeStatsResponseMock }).as(
      'mockFeeFetch',
    );
    cy.intercept(loanStatusUrl, { statusCode: 200, body: withDebtStatusMock }).as(
      'mockStatusWithDebt',
    );

    window.localStorage.setItem('borrower', accountWithALoanResponseMock.account_id);

    cy.visit('/');
    cy.get('[data-cy="settle-loan-btn"]').as('settleLoanBtn');
    cy.get('[data-cy="self-payment-btn"]').as('selfPaymentBtn');
  });

  it('Should simulate self payment', () => {
    cy.intercept(accountSignersUrl, { statusCode: 200, body: accountSignersResponseMock }).as(
      'mockAccountSigners',
    );

    accountFundedResponseMock.account_id = yUSDC_ISSUER;
    cy.intercept(`${stellarAccountUrl}/${yUSDC_ISSUER}`, {
      statusCode: 200,
      body: accountFundedResponseMock,
    }).as('mockYUSDCIssuerAccount');

    accountFundedResponseMock.account_id = VAULT_PUBLIC_KEY;
    cy.intercept(`${stellarAccountUrl}/${VAULT_PUBLIC_KEY}`, {
      statusCode: 200,
      body: accountFundedResponseMock,
    }).as('mockVaultAccount');

    cy.intercept('POST', transactionsURl, {
      statusCode: 200,
      body: transactionResponseMock,
    }).as('mockTransaction');

    cy.get('@selfPaymentBtn').click();

    cy.intercept(loanStatusUrl, { statusCode: 200, body: withoutDebtStatusMock }).as(
      'mockStatusWithoutDebt',
    );
    cy.get('@settleLoanBtn').should('contain.text', 'Withdraw Collateral Intent');
  });
});
