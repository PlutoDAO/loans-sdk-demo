<script lang="ts">
  import CodeSnippet from '../../CodeSnippet.svelte';
</script>

<CodeSnippet
  title="Check Loan Status"
  snippet={`const server = 'testnet'; // 'testnet' | 'public'
const borrower = 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';

const loanStatus = await getLoanStatus(server, borrower);`}
/>
