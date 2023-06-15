<script lang="ts">
  import { signedXdr } from '../../services/simple-signer/store';
  import SectionLoan from '../SectionLoan.svelte';

  export let inputPlaceHolder: string;

  const inputProps = {
    placeholder: inputPlaceHolder,
  };
</script>

<SectionLoan title="Send the signed XDR" bind:value={$signedXdr} inputProps={inputProps}>
  <slot name="submit-btn" slot="post-input" />
</SectionLoan>

<style>
</style>
