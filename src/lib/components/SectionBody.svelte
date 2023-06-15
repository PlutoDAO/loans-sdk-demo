<script lang="ts">
  import SectionTitle from './SectionTitle.svelte';

  export let title: string;
  export let value: string | number = '';
  export let inputProps = {};
</script>

<SectionTitle title={title} />
<section class="container">
  <slot name="prev-input" />

  <label class="label">
    <input type="text" bind:value={value} class="input" {...inputProps} />
    <div class="button">
      <slot name="input-button" />
    </div>
  </label>

  <slot name="post-input" />
</section>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .label {
    position: relative;
    display: block;
    margin-bottom: 10px;
  }

  .input {
    border: none;
    border-radius: 5px;
    padding: 10px;
    background-color: #f9f9f9;
    color: black;
  }

  .button {
    position: absolute;
    top: 0;
    right: 0;
  }

  @media (prefers-color-scheme: dark) {
    .input {
      background-color: #242b3f;
      color: white;
    }
  }
</style>
