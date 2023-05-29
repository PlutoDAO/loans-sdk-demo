<script lang="ts">
  import { sendLoan } from 'pluto-loans-sdk';
  import { Circle } from 'svelte-loading-spinners';

  import server from '../stellar/server';
  import { borrower } from '../verifyAccount/store';
  import { error, loanXdr, signedXdr } from './store';

  let isLoading = false;

  async function handleSendLoan() {
    if (isLoading) {
      return;
    }

    isLoading = true;

    try {
      const response = await sendLoan(server, $borrower.publicKey, $signedXdr);

      if (response) {
        $signedXdr = '';
        $loanXdr = '';
        $borrower.hasLoan = true;
      } else {
        $error = `Couldn't get the loan`;
      }
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);
        $error = `Error status ${parsedError.status}: ${parsedError.detail}`;
      }
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="send-loan-container">
  <label>
    <p>Signed XDR:</p>
    <input type="text" bind:value={$signedXdr} />
  </label>
  <button on:click={handleSendLoan}>
    {#if isLoading}
      <Circle size="20" color="black" />
    {:else}
      <p>Send Loan</p>
    {/if}
  </button>

  {#if $error}
    <p>{$error}</p>
  {/if}
</div>

<style>
  .send-loan-container {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
</style>
