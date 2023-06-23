<script lang="ts">
  import type { Keypair } from 'stellar-sdk';

  import { getContext } from '../../services/context';
  import CopyBtn from '../CopyBtn.svelte';

  const { Stellar, toast } = getContext('appDependencies');

  let isLoading = false;
  let pair: Keypair;

  async function handleGeneratePair() {
    isLoading = true;
    toast.loading('Generating keypair...');
    try {
      const randomPair = Stellar.generateRandomKeypair();
      await Stellar.fundAccount(randomPair);
      toast.success('Keypair generated!');
      pair = randomPair;
    } catch (e) {
      console.log(e);
      toast.error('Keypair generation failed!');
    } finally {
      isLoading = false;
    }
  }
</script>

{#if pair === undefined}
  <button disabled={isLoading} on:click={handleGeneratePair}>Generate random keypair</button>
{:else}
  <section class="pair-container">
    <h3>Copy the Secret Key and Connect with it</h3>
    <label>
      Public Key
      <input type="text" value={pair.publicKey()} readonly />
    </label>
    <label class="secret-key">
      Secret Key
      <input type="text" value={pair.secret()} readonly />
      <CopyBtn value={pair.secret()} />
    </label>
  </section>
{/if}

<style>
  .pair-container {
    display: grid;
    gap: 15px;
    margin-top: 20px;
  }
  .pair-container h3 {
    margin: 0;
  }
  .pair-container .secret-key {
    position: relative;
  }
  .pair-container .secret-key input {
    padding-right: 30px;
  }
  :global(.pair-container .copy-btn) {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
