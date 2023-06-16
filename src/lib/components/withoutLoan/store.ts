import { writable } from 'svelte/store';

const withoutLoanStore = writable({
  loanXdr: '',
  error: '',
  isSendingTheLoan: false,
});

export default withoutLoanStore;
