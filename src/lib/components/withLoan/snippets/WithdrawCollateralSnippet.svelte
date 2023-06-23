<script lang="ts">
  import CodeSnippet from '../../CodeSnippet.svelte';
</script>

<CodeSnippet
  title="Withdraw Collateral"
  snippet={`// Only when the loan paid itself
const server: ApiStellarNetwork  = 'testnet'; // 'testnet' | 'public'
const borrower = 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';

const withdrawCollateralIntentXDR = await getWithdrawCollateralIntent(server, borrower);`}
/>
