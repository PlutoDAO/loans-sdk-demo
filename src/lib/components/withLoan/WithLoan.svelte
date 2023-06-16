<script>
  import { onMount } from 'svelte';
  import SettleLoan from './SettleLoan.svelte';
  import LoanStatus from './loanStatus/LoanStatus.svelte';
  import LoanStatusCodeSnippet from './loanStatus/LoanStatusCodeSnippet.svelte';
  import { loanStatus, isStatusLoading } from './loanStatus/store';
  import { error, unsignedXdr } from './store';
  import { getContext } from '../../services/context';
  import { borrower } from '../verifyAccount/store';
  import { signedXdr } from '../../services/simple-signer/store';
  import ResultXdrSection from '../ResultXdrSection.svelte';
  import SignedXdrSection from '../SignedXdrSection.svelte';

  const loansSdk = getContext('loansSdk');
  const simpleSigner = getContext('simpleSigner');
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
    toast.loading('Fetching XDR...');

    try {
      $unsignedXdr = '';
      const asset = new loansSdk.LoanAssetRequest(false, pUSD.code, pUSD.issuer);
      $unsignedXdr = await loansSdk.getSettleDebtIntent(server, $borrower.publicKey, asset);
      toast.success('Success!');
    } catch (e) {
      toast.error("Couldn't fetch XDR");
      throw new Error(`${e}`);
    }
  }

  async function handleSendXdr() {
    toast.loading('Sending XDR...');

    try {
      const result = await loansSdk.sendWithdrawCollateral(server, $borrower.publicKey, $signedXdr);

      if (result) {
        $signedXdr = '';
        $borrower.hasLoan = false;
      }

      toast.success('Success!');
    } catch (e) {
      toast.error("Couldn't send XDR");
      throw new Error(`${e}`);
    }
  }

  function handleOnSign() {
    simpleSigner.sign($unsignedXdr);
  }

  onMount(async () => {
    await handleGetLoanStatus();
  });
</script>

<div class="container">
  <LoanStatus />

  <SettleLoan handleSettleDebt={handleSettleDebt} />

  <ResultXdrSection resultXdr={$unsignedXdr} handleOnSign={handleOnSign} />

  <SignedXdrSection
    actionButtonText="Withdraw collateral"
    handleActionButtonClick={handleSendXdr}
  />

  <LoanStatusCodeSnippet />
</div>

<style>
  .container {
    width: 100%;
    max-width: 700px;
  }
</style>
