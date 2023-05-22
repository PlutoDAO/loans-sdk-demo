<script lang="ts">
  import GetLoan from './GetLoan.svelte';
  import SendLoan from './SendLoan.svelte';

  const forms = [
    { title: 'Get loan', component: GetLoan },
    { title: 'Send loan', component: SendLoan },
  ];

  let view: typeof GetLoan | typeof SendLoan = GetLoan;

  function toggleLoanFormsComponents(
    component: typeof GetLoan | typeof SendLoan,
  ) {
    view = component;
  }
</script>

<div>
  {#each forms as form}
    <button
      on:click={() => {
        toggleLoanFormsComponents(form.component);
      }}
    >
      {form.title}
    </button>
  {/each}

  <svelte:component this={view} />
</div>
