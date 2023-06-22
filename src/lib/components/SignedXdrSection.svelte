<script lang="ts">
  import { signedXdr } from '../services/simple-signer/store';
  import Input from './Input.svelte';
  import SectionBody from './SectionBody.svelte';

  export let actionButtonText: string;
  export let handleActionButtonClick: () => void;

  const xdrPlaceholder = 'AAAAAgAAAABZzPGvncdHP5v4MhkSJFcKj9p5L5Q4SUJ5WttL';
</script>

<SectionBody title="Signed Xdr">
  <Input slot="input-label" value={$signedXdr} type={'text'} placeholder={xdrPlaceholder} />

  <button
    disabled={!$signedXdr}
    slot="post-input"
    on:click={handleActionButtonClick}
    data-cy="send-xdr-btn"
  >
    {actionButtonText}
  </button>
</SectionBody>

<style>
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
