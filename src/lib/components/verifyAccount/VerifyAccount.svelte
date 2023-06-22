<script lang="ts">
  import { getContext } from '../../services/context';
  import { publicKey } from '../../services/simple-signer/store';
  import { getShortenedText } from '../../utils/utils';
  import { getBorrowerFromStellarAccount, removeBorrower } from './helpers/helpers';
  import { borrower, isUserConnected } from './store';

  const { SimpleSigner } = getContext('appDependencies');

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
    <div class="account-container">
      <p data-cy="account-key">{getShortenedText($borrower.publicKey)}</p>
      <button on:click={handleRemoveBorrower}>Disconnect</button>
    </div>
  {:else}
    <p>Verify your Stellar account with Simple Signer</p>
    <button class="submit-btn" on:click={() => SimpleSigner.connect()}> Connect </button>
  {/if}
</div>

<style>
  .verify-account-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
    padding: 10px 0 10px 0;
  }

  .account-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px 0 10px 0;
  }

  .submit-btn {
    width: 100px;
  }
</style>
