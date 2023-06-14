<script lang="ts">
  import Copy from '../../../assets/Copy.svelte';
  import SimpleSigner from '../../services/simple-signer/SimpleSigner';
  import { getShortenedText } from '../../utils/utils';
  import store from './store';

  let shortXdr = '';

  function copyXdrToClipboard() {
    navigator.clipboard.writeText($store.loanXdr);
  }

  $: if ($store.loanXdr) {
    shortXdr = getShortenedText($store.loanXdr);
  }
</script>

<div class="result-container">
  <div class="result-xdr-container">
    <p class="result-xdr-text">{shortXdr}</p>
    <button class="copy-btn" on:click={copyXdrToClipboard}>
      <Copy />
    </button>
  </div>

  <button on:click={() => SimpleSigner.sign($store.loanXdr)}> Sign with Simple Signer </button>
</div>

<style>
  .result-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .result-xdr-container {
    background-color: #f9f9f9;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }

  .result-xdr-text {
    margin-left: 8px;
  }

  .copy-btn {
    background: none;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
  }

  @media (prefers-color-scheme: dark) {
    .result-xdr-container {
      background-color: #242b3f;
    }
  }
</style>
