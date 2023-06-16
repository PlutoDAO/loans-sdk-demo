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

<div class="snippet-container" style="max-width: 700px; margin-top: 20px">
  <Prism
    language="javascript"
    source={`
import {LoanAssetRequest, ApiStellarNetwork} from 'pluto-loans-sdk';

const server: ApiStellarNetwork = 'testnet'; // 'testnet' | 'public'
const borrower = 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';
const asset = new LoanAssetRequest('yUSDC', 'GDGTVWSM4MGS4T7Z6W4RPWOCHE2I6RDFCIFZGS3DOA63LWQTRNZNTTFF', false);
const amount = '150';
const entryBalance = new BalanceDto(asset, amount);

const loanIntentXdr = await getLoanIntent(server, borrower, entryBalance);

// Then, after the borrower signs the transaction, we send the loan

const signedLoanIntentXdr = 'AAAAAgAAAACNv+HQvu9z8arYeDQYDO5KZoPZcjtWn3QWVHFVmFgtAgAAAGQAD2qUAAAAAQAAAAE...';

await sendLoan(server, borrower, signedLoanIntentXdr);
      `}
  />
</div>
