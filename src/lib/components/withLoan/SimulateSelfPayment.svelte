<script lang="ts">
  export let isButtonVisible: boolean;
  export let handleSelfPayment: () => void;
</script>

{#if isButtonVisible}
  <button on:click={handleSelfPayment} data-cy="self-payment-btn">Simulate Self Payment</button>
{/if}
