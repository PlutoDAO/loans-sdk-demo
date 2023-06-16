<script lang="ts">
  export let handleSettleDebt: () => void;
</script>

<button on:click={handleSettleDebt}>
  <p>Settle debt</p>
</button>

<style>
  button {
    margin-top: 10px;
  }
</style>
