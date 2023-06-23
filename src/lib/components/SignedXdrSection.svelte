<script lang="ts">
  import { signedXdr } from '../services/simple-signer/store';
  import SectionBody from './SectionBody.svelte';

  export let actionButtonText: string;
  export let handleActionButtonClick: () => void;

  const xdrPlaceholder = 'AAAAAgAAAABZzPGvncdHP5v4MhkSJFcKj9p5L5Q4SUJ5WttL';
</script>

<SectionBody title="Signed Xdr">
  <input slot="input-label" bind:value={$signedXdr} type="text" placeholder={xdrPlaceholder} />

  <button
    disabled={!$signedXdr}
    slot="post-input"
    on:click={handleActionButtonClick}
    data-cy="send-xdr-btn"
  >
    {actionButtonText}
  </button>
</SectionBody>
