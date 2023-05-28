<script>
  import { sendWithdrawCollateral } from 'pluto-loans-sdk';
  import { Circle } from 'svelte-loading-spinners';

  import { signedXdr } from '../withoutLoan/store';
  import server from '../stellar/server';
  import { borrower } from '../verifyAccount/store';

  let isLoading = false;

  async function handleSendXdr() {
    try {
      isLoading = true;
      const result = await sendWithdrawCollateral(
        server,
        $borrower.publicKey,
        $signedXdr,
      );

      if (result) {
        $signedXdr = '';
        $borrower.hasLoan = false;
      }
    } catch (e) {
      throw new Error(`${e}`);
    } finally {
      isLoading = false;
    }
  }
</script>

<label>
  <p>Signed XDR:</p>
  <input type="text" bind:value={$signedXdr} />
</label>
<button on:click={handleSendXdr}>
  {#if isLoading}
    <Circle size="20" color="black" />
  {:else}
    <p>Withdraw Collateral</p>
  {/if}
</button>
