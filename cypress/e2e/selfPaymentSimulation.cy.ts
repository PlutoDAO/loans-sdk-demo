import accountFundedResponseMock from '../fixtures/account.json';
import accountSignersResponseMock from '../fixtures/stellarAccountSignersResponse.json';
import feeStatsResponseMock from '../fixtures/stellarFeeStatsResponse.json';
import requiredVaultAccountFields from '../fixtures/stellarRequiredVaultAccountFields.json';
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

accountSignersResponseMock._embedded.records[0].id = VAULT_PUBLIC_KEY;
accountSignersResponseMock._embedded.records[0].account_id = VAULT_PUBLIC_KEY;
accountSignersResponseMock._embedded.records[0].signers[0].key = VAULT_PUBLIC_KEY;

describe('Self Payment Simulation', () => {
  beforeEach(() => {
    cy.intercept(stellarFeesUrl, { statusCode: 200, body: feeStatsResponseMock }).as(
      'mockFeeFetch',
    );

    const userAccount = {
      ...JSON.parse(JSON.stringify(accountWithALoanResponseMock)),
      account_id: USER_PUBLIC_KEY,
    };
    cy.intercept(`${stellarAccountUrl}/${USER_PUBLIC_KEY}`, {
      statusCode: 200,
      body: userAccount,
    }).as('mockUserAccount');

    const vaultAccount = {
      ...JSON.parse(JSON.stringify(accountFundedResponseMock)),
      ...requiredVaultAccountFields,
      account_id: VAULT_PUBLIC_KEY,
    };
    cy.intercept(`${stellarAccountUrl}/${VAULT_PUBLIC_KEY}`, {
      statusCode: 200,
      body: vaultAccount,
    }).as('mockVaultAccount');

    const yUSDCIssuerAccount = {
      ...JSON.parse(JSON.stringify(accountFundedResponseMock)),
      account_id: yUSDC_ISSUER,
    };
    cy.intercept(`${stellarAccountUrl}/${yUSDC_ISSUER}`, {
      statusCode: 200,
      body: yUSDCIssuerAccount,
    }).as('mockYUSDCIssuerAccount');

    cy.intercept(accountSignersUrl, {
      statusCode: 200,
      body: accountSignersResponseMock,
    }).as('mockAccountSigners');

    cy.intercept('POST', transactionsURl, {
      statusCode: 200,
    }).as('mockTransaction');

    cy.intercept(loanStatusUrl, { statusCode: 200, body: withDebtStatusMock }).as(
      'mockStatusWithLoan',
    );

    window.localStorage.setItem('borrower', USER_PUBLIC_KEY);

    cy.visit('/');
    cy.get('[data-cy="remaining-debt"]').as('remainingDebt');
    cy.get('[data-cy="settle-loan-btn"]').as('settleLoanBtn');
    cy.get('[data-cy="self-payment-btn"]').as('selfPaymentBtn');
  });

  it('Should simulate self payment', () => {
    cy.get('@remainingDebt')
      .should('contain.text', `${withDebtStatusMock.remainingDebt}`)
      .then(() => {
        cy.intercept(loanStatusUrl, { statusCode: 200, body: withoutDebtStatusMock }).as(
          'mockStatusWithoutLoan',
        );

        cy.get('@selfPaymentBtn').click();

        // Verify that the mocked endpoints have been called
        cy.wait('@mockTransaction').then((interception) => {
          expect(interception).to.have.property('response');
          expect(interception.response.statusCode).to.equal(200);
        });
        cy.wait('@mockAccountSigners').then((interception) => {
          expect(interception).to.have.property('response');
          expect(interception.response.statusCode).to.equal(200);
        });
        cy.wait('@mockUserAccount').then((interception) => {
          expect(interception).to.have.property('response');
          expect(interception.response.statusCode).to.equal(200);
        });
        cy.wait('@mockVaultAccount').then((interception) => {
          expect(interception).to.have.property('response');
          expect(interception.response.statusCode).to.equal(200);
        });
        cy.wait('@mockYUSDCIssuerAccount').then((interception) => {
          expect(interception).to.have.property('response');
          expect(interception.response.statusCode).to.equal(200);
        });
        cy.wait('@mockFeeFetch').then((interception) => {
          expect(interception).to.have.property('response');
          expect(interception.response.statusCode).to.equal(200);
        });
        cy.wait('@mockStatusWithoutLoan').then((interception) => {
          expect(interception).to.have.property('response');
          expect(interception.response.statusCode).to.equal(200);
          // Verify text change after without loan status
          cy.get('@settleLoanBtn').should('contain.text', 'Withdraw Collateral Intent');
        });
      });
  });
});
