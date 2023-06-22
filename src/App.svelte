<script lang="ts">
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import * as loansSdk from 'pluto-loans-sdk';
  import { onMount } from 'svelte';
  import { Route, Router } from 'svelte-navigator';

  import VerifyAccount from './lib/components/verifyAccount/VerifyAccount.svelte';
  import { verifyBorrowerConnection } from './lib/components/verifyAccount/helpers/helpers';
  import { isUserConnected, borrower as storeBorrower } from './lib/components/verifyAccount/store';
  import { setContext } from './lib/services/context';
  import SimpleSigner from './lib/services/simple-signer/SimpleSigner';
  import server from './lib/services/stellar/server';
  import toast from './lib/services/toast';
  import Home from './routes/Home.svelte';

  let isLoading = false;

  setContext('app', {
    server,
    SimpleSigner,
    loansSdk,
    toast,
  });

  onMount(async () => {
    isLoading = true;

    try {
      const borrower = await verifyBorrowerConnection();

      if (borrower) {
        $storeBorrower = borrower;
        $isUserConnected = true;
      }
    } catch (e) {
      console.error(e);
      toast.error(`Couldn't verify account`);
    } finally {
      isLoading = false;
    }
  });
</script>

<Router primary={false}>
  <SvelteToast />

  {#if !isLoading}
    <VerifyAccount />
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
