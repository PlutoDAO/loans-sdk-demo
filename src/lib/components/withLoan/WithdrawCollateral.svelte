<script lang="ts">
  import { signedXdr } from '../../services/simple-signer/store';

  export let handleSendXdr: () => void;
</script>

<label>
  <p>Signed XDR:</p>
  <input type="text" bind:value={$signedXdr} />
</label>
<button on:click={handleSendXdr}>
  <p>Withdraw Collateral</p>
</button>
