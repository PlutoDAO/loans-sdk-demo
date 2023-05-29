<script lang="ts">
  import { onMount } from 'svelte';
  import { Route, Router } from 'svelte-navigator';

  import { verifyBorrowerConnection } from './lib/verifyAccount/helpers/helpers';
  import {
    isUserConnected,
    borrower as storeBorrower,
  } from './lib/verifyAccount/store';
  import Home from './routes/Home.svelte';

  let isLoading = false;

  onMount(async () => {
    isLoading = true;

    const borrower = await verifyBorrowerConnection();

    if (borrower) {
      $storeBorrower = borrower;
      $isUserConnected = true;
    }

    isLoading = false;
  });
</script>

<Router primary={false}>
  {#if !isLoading}
    <main class="main-container">
      <Route path="/loans-sdk-demo" component={Home} />
    </main>
  {/if}
</Router>

<style>
  .main-container {
    margin: 0 1rem 0 1rem;
  }
</style>
