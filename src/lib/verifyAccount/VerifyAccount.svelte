<script lang="ts">
  import { Server } from 'stellar-sdk';

  import SimpleSigner from '../simple-signer/SimpleSigner';
  import { mapAccountResponse } from './helpers/helpers';
  import { borrower, publicKey } from './store';

  async function handleVerifyStellarAccount() {
    const server = new Server('https://horizon-testnet.stellar.org');
    $borrower = mapAccountResponse(await server.loadAccount($publicKey));
  }

  $: if ($publicKey) {
    (async () => {
      await handleVerifyStellarAccount();
    })();
  }
</script>

<div class="verify-account-container">
  <button class="submit-btn" on:click={() => SimpleSigner.connect()}>
    Verify account simple signer
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
