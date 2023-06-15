<script lang="ts">
  import { signedXdr } from '../../services/simple-signer/store';
  import SectionBody from '../SectionBody.svelte';

  export let inputPlaceHolder: string;

  const inputProps = {
    placeholder: inputPlaceHolder,
  };
</script>

<SectionBody title="Send the signed XDR" bind:value={$signedXdr} inputProps={inputProps}>
  <slot name="submit-btn" slot="post-input" />
</SectionBody>

<style>
</style>
