import { writable } from 'svelte/store';

const withoutLoanStore = writable({
  loanXdr: '',
  error: '',
  isGettingTheLoan: false,
  isSendingTheLoan: false,
});

export default withoutLoanStore;
