<script lang="ts">
  import { Route, Router } from 'svelte-navigator';

  import Home from './routes/Home.svelte';
</script>

<Router primary={false}>
  <Route path="/" component={Home} />
</Router>
