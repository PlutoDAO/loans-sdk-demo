<script lang="ts">
  import CheckIcon from '../../assets/Check.svelte';
  import CopyIcon from '../../assets/Copy.svelte';
  import { copyToClipboard } from '../utils/utils';

  export let value: string;
  let isCopied = false;

  function handleClick(): void {
    if (!value) return;
    copyToClipboard(value);
    isCopied = true;
  }
</script>

<button class="copy-btn" on:click={handleClick}>
  {#if !isCopied}
    <CopyIcon />
  {:else}
    <CheckIcon />
  {/if}
</button>

<style>
  .copy-btn {
    background: none;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    filter: brightness(0);
  }
  @media (prefers-color-scheme: dark) {
    .copy-btn {
      filter: brightness(1);
    }
  }
</style>
