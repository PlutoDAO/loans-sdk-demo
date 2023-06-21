<script lang="ts">
  export let text: string;
  export let handleSettleDebt: () => void;
</script>

<button on:click={handleSettleDebt} data-cy="settle-loan-btn">
  <p>{text}</p>
</button>

<style>
  button {
    margin-top: 10px;
  }
</style>
