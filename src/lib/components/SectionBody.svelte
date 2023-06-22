<script lang="ts">
  import SectionTitle from './SectionTitle.svelte';

  export let title: string;
</script>

<SectionTitle title={title} />
<section class="container">
  <slot name="prev-input" />

  <label class="label">
    <slot name="input-label" />
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

  .button {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
