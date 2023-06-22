<script lang="ts">
  import CopyIcon from '../../assets/Copy.svelte';
  import { getShortenedText } from '../utils/utils';
  import Input from './Input.svelte';
  import SectionBody from './SectionBody.svelte';

  export let resultXdr: string;
  export let handleOnSign: () => void;
  let shortXdr = '';

  $: if (resultXdr) {
    shortXdr = getShortenedText(resultXdr);
  }

  function copyXdrToClipboard() {
    navigator.clipboard.writeText(resultXdr);
  }
</script>

<SectionBody title="Result">
  <Input slot="input-label" value={shortXdr} type={'text'} disabled={true} />

  <button slot="input-button" class="copy-btn" on:click={copyXdrToClipboard}>
    <CopyIcon />
  </button>

  <button disabled={!resultXdr} slot="post-input" on:click={handleOnSign} data-cy="sign-btn">
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
