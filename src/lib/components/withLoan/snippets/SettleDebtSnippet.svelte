<script lang="ts">
  import CodeSnippet from '../../CodeSnippet.svelte';
</script>

<CodeSnippet
  title="Settle Debt"
  snippet={`const asset = new LoanAssetRequest(
  'pUSD',
  'GBMUBDMUOSN6LMB6X2YREGIFEJRXVYOVL6EV3LGRVPQ5KPJZO5E644I4',
  false,
);

const settleDebtXDR = await getSettleDebtIntent(server, borrower, asset);

// When the borrower signs the XDR, we send it

const signedWithdrawCollateralXdr =
    'AAAAAgAAAACNv+HQvu9z8arYeDQYDO5KZoPZcjtWn3QWVHFVmFgtAgAAAGQAD2qUAAAAAQAAAAE...';

await sendWithdrawCollateral(server, borrower, signedWithdrawCollateralXdr);`}
/>
