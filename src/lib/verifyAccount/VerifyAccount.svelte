<script lang="ts">
  import { Server } from 'stellar-sdk';

  import { mapAccountResponse } from './helpers/helpers';
  import { borrower } from './store';

  let publicKey: string;

  async function handleVerifyStellarAccount() {
    if (publicKey) {
      const server = new Server('https://horizon-testnet.stellar.org');
      $borrower = mapAccountResponse(await server.loadAccount(publicKey));
    }
  }
</script>

<div class="verify-account-container">
  <label>
    <p>Account:</p>
    <input
      type="text"
      bind:value={publicKey}
      placeholder="GDRKRGDPWSWYQT4OE2GVKB2CBEPLAAXYZ3WYZTE46647YRJO5BAX5L2B"
    />
  </label>
  <button class="submit-btn" on:click={handleVerifyStellarAccount}>
    Verify account
  </button>
</div>

<style>
  .verify-account-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
</style>
