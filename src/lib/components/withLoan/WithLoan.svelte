<script>
  import { onMount } from 'svelte';
  import SettleLoan from './SettleLoan.svelte';
  import LoanStatus from './loanStatus/LoanStatus.svelte';
  import LoanStatusCodeSnippet from './loanStatus/LoanStatusCodeSnippet.svelte';
  import { loanStatus, isStatusLoading } from './loanStatus/store';
  import { error, unsignedXdr } from './store';
  import { getContext } from '../../services/context';
  import { borrower } from '../verifyAccount/store';
  import WithdrawCollateral from './WithdrawCollateral.svelte';
  import { getShortenedText } from '../../utils/utils';
  import { signedXdr } from '../../services/simple-signer/store';
  import WithdrawResult from './WithdrawResult.svelte';

  const SimpleSigner = getContext('simpleSigner');
  const loansSdk = getContext('loansSdk');
  const server = getContext('stellar');
  const toast = getContext('toast');
  const pUSD = { code: 'pUSD', issuer: 'GAZXGXY3B3VYKCJTWKQCSPFFLW7OT6D5NVMT2ZYUEFM7WDOR5B2NGKWS' };

  async function handleGetLoanStatus() {
    toast.loading('Getting loan status...');
    $isStatusLoading = true;

    try {
      $loanStatus = await loansSdk.getLoanStatus(server, $borrower.publicKey);
      toast.success('Loan status retrieved successfully');
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);

        if (parsedError.type === 'LOAN_NOT_FOUND') {
          $error = 'Loan not found';
        } else {
          $error = parsedError.detail;
        }
      }
    } finally {
      $isStatusLoading = false;
    }
  }

  async function handleSettleDebt() {
    try {
      $unsignedXdr = '';

      const asset = new loansSdk.LoanAssetRequest(false, pUSD.code, pUSD.issuer);
      $unsignedXdr = await loansSdk.getSettleDebtIntent(server, $borrower.publicKey, asset);
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  async function handleSendXdr() {
    try {
      const result = await loansSdk.sendWithdrawCollateral(server, $borrower.publicKey, $signedXdr);

      if (result) {
        $signedXdr = '';
        $borrower.hasLoan = false;
      }
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  async function handleSign() {
    SimpleSigner.sign($unsignedXdr);
  }

  onMount(async () => {
    await handleGetLoanStatus();
  });
</script>

<div class="container">
  <LoanStatus />

  {#if $loanStatus}
    {#if $loanStatus.remainingDebt}
      <SettleLoan handleSettleDebt={handleSettleDebt}>
        <WithdrawResult
          slot="result-component"
          xdr={getShortenedText($unsignedXdr)}
          handleSign={handleSign}
        />
        <WithdrawCollateral slot="withdraw-component" handleSendXdr={handleSendXdr} />
      </SettleLoan>
    {/if}
  {/if}

  <LoanStatusCodeSnippet />
</div>

<style>
  .container {
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
