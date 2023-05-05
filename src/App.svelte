<script lang="ts">
  import { Route, Router } from 'svelte-navigator';

  import Home from './routes/Home.svelte';
</script>

<Router primary={false}>
  <main class="main-container">
    <Route path="/loans-sdk-demo" component={Home} />
  </main>
</Router>

<style>
</style>
