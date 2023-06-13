<script lang="ts">
  import SimpleSigner from '../services/simple-signer/SimpleSigner';
  import { getShortenedText } from '../utils/utils';
  import { loanXdr } from './store';

  let isXdrInClipboard = false;

  function copyXdrToClipboard() {
    navigator.clipboard.writeText($loanXdr);
    isXdrInClipboard = true;
  }
</script>

<div class="result-container">
  <div class="result-xdr-container">
    <p>Result:</p>
    <p>{getShortenedText($loanXdr)}</p>
  </div>

  <button on:click={copyXdrToClipboard}>
    {isXdrInClipboard ? 'Copied!' : 'Copy result'}
  </button>

  <button on:click={() => SimpleSigner.sign($loanXdr)}> Sign with Simple Signer </button>
</div>

<style>
  .result-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 20px;
  }

  .result-xdr-container {
    background-color: #f9f9f9;
    width: 100%;
  }

  @media (prefers-color-scheme: dark) {
    .result-xdr-container {
      background-color: #181d2a;
    }
  }
</style>
