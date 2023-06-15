<script lang="ts">
  import Copy from '../../../assets/Copy.svelte';
  import SimpleSigner from '../../services/simple-signer/SimpleSigner';
  import { getShortenedText } from '../../utils/utils';
  import SectionBody from '../SectionBody.svelte';
  import store from './store';

  let shortXdr = '';

  function copyXdrToClipboard() {
    navigator.clipboard.writeText($store.loanXdr);
  }

  $: if ($store.loanXdr) {
    shortXdr = getShortenedText($store.loanXdr);
  }

  const inputProps = {
    disabled: true,
  };
</script>

<SectionBody title="Result" bind:value={shortXdr} inputProps={inputProps}>
  <button slot="input-button" class="copy-btn" on:click={copyXdrToClipboard}>
    <Copy />
  </button>

  <button slot="post-input" on:click={() => SimpleSigner.sign($store.loanXdr)}> Sign with Simple Signer </button>
</SectionBody>

<style>
  .copy-btn {
    background: none;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
  }
</style>
