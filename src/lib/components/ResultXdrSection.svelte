<script lang="ts">
  import Copy from '../../assets/Copy.svelte';
  import SimpleSigner from '../services/simple-signer/SimpleSigner';
  import { getShortenedText } from '../utils/utils';
  import SectionBody from './SectionBody.svelte';

  export let resultXdr: string;
  let shortXdr = '';

  const inputProps = {
    type: { type: 'text' },
    disabled: true,
  };

  $: if (resultXdr) {
    shortXdr = getShortenedText(resultXdr);
  }

  function copyXdrToClipboard() {
    navigator.clipboard.writeText(resultXdr);
  }
</script>

<SectionBody
  title="Result"
  bind:value={shortXdr}
  type={inputProps.type}
  disabled={inputProps.disabled}
>
  <button slot="input-button" class="copy-btn" on:click={copyXdrToClipboard}>
    <Copy />
  </button>

  <button disabled={!resultXdr} slot="post-input" on:click={() => SimpleSigner.sign(resultXdr)}>
    Sign with Simple Signer
  </button>
</SectionBody>

<style>
  .copy-btn {
    background: none;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
