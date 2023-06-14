<script lang="ts">
  import { unsignedXdr } from './store';

  export let handleSettleDebt: () => void;
</script>

<div>
  <button on:click={handleSettleDebt}>
    <p>Settle debt</p>
  </button>
  <hr class="solid" />
  {#if $unsignedXdr}
    <slot name="result-component" />
    <slot name="withdraw-component" />
  {/if}
</div>

<style>
  .solid {
    width: 100%;
    border-top: 1px solid #bbb;
  }
</style>
