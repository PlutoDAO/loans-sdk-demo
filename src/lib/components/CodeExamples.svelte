<script lang="ts">
  import { borrower, isUserConnected } from '../../lib/components/verifyAccount/store';
  import WithLoanSnippets from './withLoan/snippets/WithLoanSnippets.svelte';
  import WithoutLoanSnippets from './withoutLoan/snippets/WithoutLoanSnippets.svelte';

  let items = [
    {
      label: 'Without Loan',
      component: WithoutLoanSnippets,
    },
    {
      label: 'With Loan',
      component: WithLoanSnippets,
    },
  ];

  let activeIndex = 0;
  $: activeIndex = $isUserConnected && $borrower?.hasLoan ? 1 : 0;
</script>

<section class="container">
  <h2>Code Examples</h2>

  <div class="switch">
    {#each items as item, index}
      <button class={activeIndex === index ? 'active' : ''} on:click={() => (activeIndex = index)}
        >{item.label}</button
      >
    {/each}
  </div>

  {#each items as item, index}
    {#if activeIndex == index}
      <div class="box">
        <svelte:component this={item.component} />
      </div>
    {/if}
  {/each}
</section>

<style>
  .container {
    --primary: #6267c5;
    text-align: left;
    width: 100%;
    max-width: 700px;
    margin-bottom: 40px;
  }

  .switch {
    display: flex;
    border-bottom: 1px solid var(--primary);
  }

  .switch button {
    background: none;
    outline: none;
    border: 1px solid transparent;
    margin-bottom: -1px;
    border-radius: 0;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    padding: 0.5rem 1rem;
  }

  .switch button:hover {
    border-color: var(--primary);
  }

  .switch button.active {
    color: rgb(28, 28, 29);
    border-color: var(--primary);
    background-color: var(--primary);
    border-bottom: 0;
  }

  .box {
    padding: 10px 25px;
    border: 1px solid var(--primary);
    border-radius: 0 0 0.5rem 0.5rem;
    border-top: 0;
  }
</style>
