<script lang="ts">
  import { signedXdr } from '../services/simple-signer/store';
  import { error } from './store';

  const xdrPlaceholder = 'AAAAAgAAAABZzPGvncdHP5v4MhkSJFcKj9p5L5Q4SUJ5WttL';

  export let handleSendLoan: () => Promise<void>;
</script>

<div class="send-loan-container">
  <label>
    <input type="text" bind:value={$signedXdr} class="bg-color" placeholder={xdrPlaceholder} />
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .bg-color {
    background-color: #242b3f;
    color: white;
    border: none;
  }
</style>
