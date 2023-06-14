<script lang="ts">
  import { signedXdr } from '../services/simple-signer/store';
  import { error } from './store';

  export let inputPlaceHolder: string;
</script>

<div class="send-loan-container">
  <label>
    <input type="text" bind:value={$signedXdr} class="bg-color" placeholder={inputPlaceHolder} />
  </label>

  <slot name="submit-btn" />

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
