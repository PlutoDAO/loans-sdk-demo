<script lang="ts">
  export let show: boolean;
  export let handleSelfPayment: () => void;
</script>

{#if show}
  <button on:click={handleSelfPayment} data-cy="self-payment-btn">Simulate Self Payment</button>
{/if}
