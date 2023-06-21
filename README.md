# Loans SDK Demo

The loans-sdk-demo is a web application that displays the product interface for the loans-sdk package. It provides developers with an easy way to test and understand how to use the loans-sdk package.

You can access the demo at https://plutodao.github.io/loans-sdk-demo/.

## How to run it?

<table>
    <thead>
        <tr>
            <th>npm run</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
      <tr>
          <td>dev</td>
          <td>Runs the app in dev mode</td>
      </tr>
      <tr>
        <td>build</td>
        <td>Builds the application for production</td>
      </td>
      <tr>
        <td>preview</td>
        <td>Previews the built application</td>
      </td>
      <tr>
        <td>deploy</td>
        <td>Deploys the application</td>
      </td>
      <tr>
        <td>test:ui:dev</td>
        <td>Runs Cypress integration tests</td>
      </td>
    </tbody>
</table>

## How it works?

### Verify your Account

In order to request a loan, you need to connect a Stellar account. We use [Simple Signer](https://github.com/PlutoDAO/simple-stellar-signer/) to achieve that. This will give us information about if you have or haven't a loan.

### Request a Loan

Shows a form where the user can request a loan by depositing the collateral amount. In order to request the loan the collateral amount and user's public key will get sent to the backend through a POST method that'll return and unsigned transaction. Then, the user will need to sign it to then submit the signed transaction to the backend. Once this is done the backend will submit the transaction to Stellar Network.

The page also shows a code snippet to help developers with the loan request process.

### Withdraw Collateral

If you already have a loan, the page will display your loan status and a button to settle the loan. Even though the loan is designed to get paid by itself with the earnings it generates, the user also has the option to settle the debt in advance. In order to do so, they can deposit the total of the remaining debt in yUSDC

Once the debt is fully settled the user will have the option to withdraw the original collateral.

The page also shows a code snippet to help developers with the withdraw collateral process.

## Folder structure

    ├── cypress                 # Cypress tests
    ├── src                     # Source files
        ├── assets              # Images, icons
        ├── lib                 # Utilities
            ├── components      # Components like SectionBody and SubmitBtn
            ├── utils           # Helpers like getShortenedText function
            ├── services        # Service used in the demo
            ├── storage         # Classes to interact with storage
        ├── routes              # Routes components
        App.svelte              # Main component, routes handler

## References

- Loans SDK: https://github.com/PlutoDAO/loans-sdk
- Simple Signer: https://github.com/PlutoDAO/simple-stellar-signer/
- Stellar SDK: https://github.com/stellar/js-stellar-sdk
