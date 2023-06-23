<script lang="ts">
  import CodeSnippet from '../../CodeSnippet.svelte';
</script>

<CodeSnippet
  title="Get a Loan"
  snippet={`import { LoanAssetRequest, ApiStellarNetwork } from 'pluto-loans-sdk';

const server: ApiStellarNetwork = 'testnet'; // 'testnet' | 'public'
const borrower = 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';
const asset = new LoanAssetRequest('yUSDC', 'GDGTVWSM4MGS4T7Z6W4RPWOCHE2I6RDFCIFZGS3DOA63LWQTRNZNTTFF', false);
const amount = '150';
const entryBalance = new BalanceDto(asset, amount);

const loanIntentXdr = await getLoanIntent(server, borrower, entryBalance);

// Then, after the borrower signs the transaction, we send the loan

const signedLoanIntentXdr = 'AAAAAgAAAACNv+HQvu9z8arYeDQYDO5KZoPZcjtWn3QWVHFVmFgtAgAAAGQAD2qUAAAAAQAAAAE...';

await sendLoan(server, borrower, signedLoanIntentXdr);`}
/>
