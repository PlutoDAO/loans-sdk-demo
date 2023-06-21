import account from '../fixtures/testnetPublicKey.json';
import withDebtLoan from '../fixtures/withDebtLoan.json';
import accountMock from '../fixtures/withLoanAccount.json';
import withoutDebtLoan from '../fixtures/withoutDebtLoan.json';

const publicKey = account.key;
const stellarMockUrl = `https://horizon-testnet.stellar.org/accounts/${publicKey}`;
const apiUrl = `https://test.loans-api.plutodao.finance/loan/${publicKey}`;
accountMock.account_id = publicKey;

describe('WithLoan', () => {
  beforeEach(() => {
    cy.intercept(stellarMockUrl, { statusCode: 200, body: accountMock }).as('mockAccount');
    window.localStorage.setItem('borrower', accountMock.account_id);
    cy.visit('/');
    cy.get('.status-container > :nth-child(1)').as('percentagePaid');
    cy.get('.status-container > :nth-child(2)').as('remainingDebt');
    cy.get('.status-container > :nth-child(3)').as('userTotalYusdcInVault');
    cy.get('button.s-fINgMoWb8Kev').as('settleLoanBtn');
  });

  it('should display the WithLoan component when a loan has debt', () => {
    cy.intercept(apiUrl, { statusCode: 200, body: withDebtLoan }).as('mockLoan');
    cy.visit('/');
    cy.get('.s-Vyl6_2jR_RnI > :nth-child(1)').should('contain.text', 'Loan Status');
    cy.get('@percentagePaid').should('contain.text', `${withDebtLoan.percentagePaid}%`);
    cy.get('@remainingDebt').should('contain.text', `${withDebtLoan.remainingDebt}`);
    cy.get('@userTotalYusdcInVault').should(
      'contain.text',
      `${withDebtLoan.userTotalYusdcInVault}`,
    );

    cy.get('@settleLoanBtn').should('contain.text', 'Settle debt');
  });

  it('should display the WithLoan component when a loan has being paid', () => {
    cy.intercept(apiUrl, { statusCode: 200, body: withoutDebtLoan }).as('mockLoan');
    cy.visit('/');
    cy.get('.s-Vyl6_2jR_RnI > :nth-child(1)').should('contain.text', 'Loan Status');
    cy.get('@percentagePaid').should('contain.text', `${withoutDebtLoan.percentagePaid}%`);
    cy.get('@remainingDebt').should('contain.text', `${withoutDebtLoan.remainingDebt}`);
    cy.get('@userTotalYusdcInVault').should(
      'contain.text',
      `${withoutDebtLoan.userTotalYusdcInVault}`,
    );

    cy.get('@settleLoanBtn').should('contain.text', 'Withdraw Collateral Intent');
  });
});
