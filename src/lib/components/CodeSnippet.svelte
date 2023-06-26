<script lang="ts">
  import Prism from 'svelte-prism';

  import CopyBtn from './CopyBtn.svelte';

  export let language = 'javascript';
  export let snippet: string;
  export let title = '';
</script>

{#if title} <h3 class="snippet-title">{title}</h3> {/if}
<article class="snippet-container">
  <Prism language={language} source={snippet} />
  <CopyBtn value={snippet} />
</article>

<style>
  .snippet-title {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  .snippet-container {
    position: relative;
    max-width: 700px;
  }
  :global(.snippet-container pre[class*='language-']) {
    display: flex;
    margin: 0;
    padding: 0;
  }
  :global(code[class*='language-']) {
    overflow-x: auto;
    padding: 1rem;
  }
  :global(.snippet-container .copy-btn) {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    filter: brightness(1);
    top: 0;
    right: 0;
    margin: 10px;
  }
</style>
