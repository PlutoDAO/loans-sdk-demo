<script lang="ts">
  import Prism from 'svelte-prism';

  let windowWidth: number;
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Open+Sans:400,700"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="https://tutsplus.github.io/syntax-highlighter-demos/highlighters/Prism/prism_okaidia.css"
  />
</svelte:head>

<svelte:window bind:outerWidth={windowWidth} />

<div class="snippet-container" style="max-width: 700px">
  <Prism
    language="javascript"
    source={`
const asset = new LoanAssetRequest(
  'yUSDC',
  'GDGTVWSM4MGS4T7Z6W4RPWOCHE2I6RDFCIFZGS3DOA63LWQTRNZNTTFF',
  false,
);

const settleDebtXDR = await getSettleDebtIntent(server, borrower, asset);

// When the borrower signs the XDR, we send it

const signedWithdrawCollateralXdr =
    'AAAAAgAAAACNv+HQvu9z8arYeDQYDO5KZoPZcjtWn3QWVHFVmFgtAgAAAGQAD2qUAAAAAQAAAAE...';

await sendWithdrawCollateral(server, borrower, signedWithdrawCollateralXdr);
    `}
  />
</div>
