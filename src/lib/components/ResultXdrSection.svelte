<script lang="ts">
  import { getShortenedText } from '../utils/utils';
  import CopyBtn from './CopyBtn.svelte';
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

  <CopyBtn slot="input-button" value={resultXdr} />

  <button disabled={!resultXdr} slot="post-input" on:click={handleOnSign} data-cy="sign-btn">
    Sign with Simple Signer
  </button>
</SectionBody>

<style>

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
