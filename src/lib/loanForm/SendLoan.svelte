<script lang="ts">
  import { sendLoan } from 'pluto-loans-sdk';

  import server from '../stellar/server';
  import { borrower } from './store';

  let signedXdr: string;

  async function handleSendLoan() {
    if (signedXdr) {
      const response = await sendLoan(server, $borrower.publicKey, signedXdr);
      console.log(response);
    }
  }
</script>

<div>
  <label>
    <p>Signed XDR</p>
    <input type="text" bind:value={signedXdr} />
  </label>
  <button on:click={handleSendLoan}>Send loan</button>
</div>
