<script lang="ts">
  import { getContext } from '../../services/context';
  import { signedXdr } from '../../services/simple-signer/store';
  import ResultXdrSection from '../ResultXdrSection.svelte';
  import SignedXdrSection from '../SignedXdrSection.svelte';
  import SubmitBtn from '../SubmitBtn.svelte';
  import { borrower } from '../verifyAccount/store';
  import GetLoan from './GetLoan.svelte';
  import WithoutLoanSnippets from './snippets/WithoutLoanSnippets.svelte';
  import { isSendingTheLoan, loanAmount, loanXdr } from './store';

  const { loansSdk, server, toast, SimpleSigner } = getContext('appDependencies');
  let balance = getAccountXlmBalance();

  function getAccountXlmBalance() {
    for (const asset of $borrower.balance) {
      if (asset.code === 'native') {
        return asset.balance;
      }
    }

    throw new Error();
  }

  async function getLoanXdr() {
    const asset = new loansSdk.LoanAssetRequest(true);
    const entryBalance = new loansSdk.BalanceDto(asset, $loanAmount);

    return await loansSdk.getLoanIntent(server, $borrower.publicKey, entryBalance);
  }

  async function handleGetLoan() {
    toast.loading('Fetching XDR...');

    if (!$loanAmount) {
      toast.error('Loan amount is required.');
      return;
    }

    try {
      clearStores();
      $loanXdr = await getLoanXdr();
      toast.success('Success!');
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);
        toast.error(`Error status ${parsedError.status}: ${parsedError.detail}`);
      }
    }
  }

  async function handleSendLoan() {
    toast.loading('Sending XDR...');
    if ($isSendingTheLoan) {
      return;
    }

    try {
      await sendLoan();
      clearStores();
    } catch (e) {
      if (e instanceof Error) {
        const parsedError = JSON.parse(e.message);
        toast.error(`Error status ${parsedError.status}: ${parsedError.detail}`);
      }
    } finally {
      $isSendingTheLoan = false;
    }

    async function sendLoan() {
      const response = await loansSdk.sendLoan(server, $borrower.publicKey, $signedXdr);
      $isSendingTheLoan = true;

      if (response) {
        toast.success('Success!');
        $borrower.hasLoan = true;
      } else {
        toast.error(`Couldn't get the loan`);
      }
    }
  }

  function handleOnSign() {
    SimpleSigner.sign($loanXdr);
  }

  function clearStores() {
    $loanXdr = '';
    $signedXdr = '';
  }
</script>

<div class="without-loan-container">
  <GetLoan balance={balance}>
    <SubmitBtn slot="submit-btn" text="Get Loan" onClick={handleGetLoan} />
  </GetLoan>

  <ResultXdrSection resultXdr={$loanXdr} handleOnSign={handleOnSign} />

  <SignedXdrSection actionButtonText="Send loan" handleActionButtonClick={handleSendLoan} />

  <WithoutLoanSnippets />
</div>

<style>
  .without-loan-container {
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
  }
</style>
