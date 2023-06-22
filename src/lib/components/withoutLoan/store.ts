import { writable } from 'svelte/store';

export const loanXdr = writable('');
export const loanAmount = writable('');
export const isSendingTheLoan = writable(false);
