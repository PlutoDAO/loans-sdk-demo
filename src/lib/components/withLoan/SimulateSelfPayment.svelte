<script lang="ts">
  export let show: boolean;
  export let handleSelfPayment: () => void;
  let isDisabled = show;

  function handleClick() {
    isDisabled = true;
    handleSelfPayment();
  }
</script>

{#if show}
  <button on:click={handleClick} disabled={isDisabled}>Simulate Self Payment</button>
{/if}
