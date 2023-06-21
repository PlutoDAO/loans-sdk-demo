<script lang="ts">
  export let text: string;
  export let onClick: () => void;
  export let isDisable = false;
</script>

<div class="submit-container">
  <button on:click={onClick} disabled={isDisable} data-cy="submit-btn">
    <p>{text}</p>
  </button>
</div>

<style>
  .submit-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
</style>
