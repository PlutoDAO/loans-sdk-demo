<script lang="ts">
  import { signedXdr } from '../services/simple-signer/store';
  import { error } from './store';

  export let handleSendLoan: () => Promise<void>;
</script>

<div class="send-loan-container">
  <label>
    <p>Signed XDR:</p>
    <input type="text" bind:value={$signedXdr} />
  </label>
  <button on:click={handleSendLoan}>
    <p>Send Loan</p>
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
