<script lang="ts">
  import { Circle } from 'svelte-loading-spinners';

  export let text: string;
  export let onClick: () => void;
  export let isDisable = false;
  export let isLoading: boolean;
</script>

<div class="submit-container">
  <button on:click={onClick} disabled={isDisable}>
    <p>{text}</p>
  </button>
  {#if isLoading}
    <Circle size="20" color="white" />
  {/if}
</div>

<style>
  .submit-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
</style>
