<script>
  import { onMount } from 'svelte';
  import SettleLoan from './SettleLoan.svelte';
  import LoanStatus from './loanStatus/LoanStatus.svelte';
  import { loanStatus, isStatusLoading, hasLoanBeenPaid } from './loanStatus/store';
  import { error, unsignedXdr } from './store';
  import { getContext } from '../../services/context';
  import { borrower } from '../verifyAccount/store';
  import { signedXdr } from '../../services/simple-signer/store';
  import ResultXdrSection from '../ResultXdrSection.svelte';
  import SignedXdrSection from '../SignedXdrSection.svelte';
  import SimulateSelfPayment from './SimulateSelfPayment.svelte';

  const { loansSdk, Stellar, toast, SimpleSigner } = getContext('appDependencies');
  const server = Stellar.server;
  const pUSD = { code: 'pUSD', issuer: import.meta.env['VITE_PUSD_ISSUER_PUBLIC_KEY'] };

  async function handleGetLoanStatus() {
    toast.loading('Getting loan status...');
    $isStatusLoading = true;

    try {
      $loanStatus = await loansSdk.getLoanStatus(server, $borrower.publicKey);
      $hasLoanBeenPaid = $loanStatus.remainingDebt <= 0;
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
    clearStores();
    toast.loading('Fetching XDR...');

    try {
      $unsignedXdr = '';

      if ($hasLoanBeenPaid) {
        await getWithdrawCollateralIntent();
      } else {
        await settleDebt();
      }

      toast.success('Success!');
    } catch (e) {
      toast.error("Couldn't fetch the XDR");
      throw new Error(`${e}`);
    }

    async function settleDebt() {
      const asset = new loansSdk.LoanAssetRequest(false, pUSD.code, pUSD.issuer);
      $unsignedXdr = await loansSdk.getSettleDebtIntent(server, $borrower.publicKey, asset);
    }

    async function getWithdrawCollateralIntent() {
      $unsignedXdr = await loansSdk.getWithdrawCollateralIntent(server, $borrower.publicKey);
    }
  }

  async function handleSendXdr() {
    toast.loading('Sending XDR...');

    try {
      const result = await loansSdk.sendWithdrawCollateral(server, $borrower.publicKey, $signedXdr);

      if (result) {
        clearStores();
        $borrower.hasLoan = false;
      }

      toast.success('Success!');
    } catch (e) {
      toast.error("Couldn't send XDR");
      throw new Error(`${e}`);
    }
  }

  async function handleSelfPayment() {
    const DEBT_MULTIPLIER = 1.1;
    const DEBT_AMOUNT = $loanStatus.remainingDebt * DEBT_MULTIPLIER;
    toast.loading('Simulating self payment...');

    const vaultAccount = await Stellar.getVaultAccountFromBorrower($borrower.publicKey);

    if (vaultAccount) {
      try {
        const operations = [
          Stellar.createPaymentOperation(
            'yUSDC',
            import.meta.env['VITE_YUSDC_ISSUER_PUBLIC_KEY'],
            DEBT_AMOUNT.toString(),
            vaultAccount,
          ),
        ];
        const transaction = await Stellar.createTransaction(
          import.meta.env['VITE_YUSDC_ISSUER_SECRET_KEY'],
          operations,
        );
        await Stellar.submitTransaction(transaction);
        toast.success('Success!');

        await handleGetLoanStatus();
      } catch (e) {
        console.error(e);
        toast.error("Couldn't send asset");
      }
    } else {
      toast.error("Couldn't find vault account");
    }
  }

  function handleOnSign() {
    SimpleSigner.sign($unsignedXdr);
  }

  function clearStores() {
    $signedXdr = '';
    $unsignedXdr = '';
  }

  onMount(async () => {
    await handleGetLoanStatus();
  });
</script>

<div class="container">
  <LoanStatus />

  <SettleLoan
    text={$hasLoanBeenPaid ? 'Withdraw Collateral Intent' : 'Settle debt'}
    handleSettleDebt={handleSettleDebt}
  />

  <SimulateSelfPayment isButtonVisible={!$hasLoanBeenPaid} handleSelfPayment={handleSelfPayment} />

  <ResultXdrSection resultXdr={$unsignedXdr} handleOnSign={handleOnSign} />

  <SignedXdrSection
    actionButtonText="Withdraw collateral"
    handleActionButtonClick={handleSendXdr}
  />
</div>

<style>
  .container {
    width: 100%;
    max-width: 700px;
  }
</style>
