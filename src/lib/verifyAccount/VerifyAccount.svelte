<script lang="ts">
  import SimpleSigner from '../simple-signer/SimpleSigner';
  import { getShortenedPublicKey } from '../utils/utils';
  import {
    getBorrowerFromStellarAccount,
    removeBorrower,
  } from './helpers/helpers';
  import { borrower, isUserConnected, publicKey } from './store';

  async function handleVerifyStellarAccount() {
    $borrower = await getBorrowerFromStellarAccount($publicKey);
    $isUserConnected = true;
  }

  function handleRemoveBorrower() {
    removeBorrower();
    $isUserConnected = false;
    $publicKey = '';
  }

  $: if ($publicKey) {
    (async () => {
      await handleVerifyStellarAccount();
    })();
  }
</script>

<div class="verify-account-container">
  {#if $isUserConnected && $borrower}
    <div>
      <p>Stellar Account: {getShortenedPublicKey($borrower.publicKey)}</p>
      <button on:click={handleRemoveBorrower}>Disconnect</button>
    </div>
  {:else}
    <p>Verify your Stellar account with Simple Signer</p>
    <button class="submit-btn" on:click={() => SimpleSigner.connect()}>
      Connect
    </button>
  {/if}
</div>

<style>
  .verify-account-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    justify-content: center;
    text-align: center;
  }
</style>
