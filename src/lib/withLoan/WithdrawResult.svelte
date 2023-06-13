<script lang="ts">
  import { unsignedXdr } from './store';

  export let xdr: string;
  export let handleSign: () => void;
  let isXdrInClipboard = false;

  function copyXdrToClipboard() {
    navigator.clipboard.writeText($unsignedXdr);
    isXdrInClipboard = true;
  }
</script>

<div class="result-xdr-container">
  <p>Result:</p>
  <p>{xdr}</p>
</div>
<button on:click={copyXdrToClipboard}>
  {isXdrInClipboard ? 'Copied!' : 'Copy result'}
</button>
<button on:click={handleSign}> Sign with Simple Signer </button>
<hr class="solid" />

<style>
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
