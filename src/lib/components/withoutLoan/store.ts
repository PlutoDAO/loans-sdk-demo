import { writable } from 'svelte/store';

const withoutLoanStore = writable({
  loanXdr: '',
  loanAmount: '',
  isSendingTheLoan: false,
});

export default withoutLoanStore;
