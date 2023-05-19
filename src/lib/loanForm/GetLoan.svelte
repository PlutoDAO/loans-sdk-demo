<script lang="ts">
  import { BalanceDto, LoanAssetRequest, getLoanIntent } from 'pluto-loans-sdk';
  import { Server } from 'stellar-sdk';

  import server from '../stellar/server';
  import { mapAccountResponse } from './helpers/helpers';
  import { borrower } from './store';

  let publicKey: string;
  let amount: number;
  let loanXdr: string;

  async function handleGetLoan() {
    const asset = new LoanAssetRequest(true);
    const entryBalance = new BalanceDto(asset, `${amount}`);
    loanXdr = await getLoanIntent(server, $borrower.publicKey, entryBalance);
  }

  async function handleVerifyStellarAccount() {
    if (publicKey) {
      const server = new Server('https://horizon-testnet.stellar.org');
      $borrower = mapAccountResponse(await server.loadAccount(publicKey));
    }
  }
</script>

<div class="container">
  <h4>Get Loan intent</h4>

  <div class="verify-account-container">
    <label>
      <p>Account:</p>
      <input
        type="text"
        bind:value={publicKey}
        placeholder="GDRKRGDPWSWYQT4OE2GVKB2CBEPLAAXYZ3WYZTE46647YRJO5BAX5L2B"
      />
    </label>
    <button class="submit-btn" on:click={handleVerifyStellarAccount}
      >Verify account</button
    >
  </div>

  {#if $borrower}
    <div>
      <p>{`XLM in account ${$borrower.balance.xlm}`}</p>
      <label>
        <p>Amount:</p>
        <input type="number" bind:value={amount} />
      </label>
      <button on:click={handleGetLoan}>Get loan</button>
    </div>
  {/if}

  {#if loanXdr}
    <p>{loanXdr}</p>
  {/if}
</div>

<style>
  .verify-account-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .container {
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
