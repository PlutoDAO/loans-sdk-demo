<script lang="ts">
  import CopyIcon from '../../assets/Copy.svelte';
  import { copyToClipboard, getShortenedText } from '../utils/utils';
  import SectionBody from './SectionBody.svelte';

  export let resultXdr: string;
  export let handleOnSign: () => void;
  let shortXdr = '';

  $: if (resultXdr) {
    shortXdr = getShortenedText(resultXdr);
  }
</script>

<SectionBody title="Result">
  <input slot="input-label" value={shortXdr} type="text" disabled={true} />

  <button slot="input-button" class="copy-btn" on:click={() => copyToClipboard(resultXdr)}>
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
