import { writable } from 'svelte/store';

export const loanXdr = writable<string>();
export const error = writable<string>();
export const isGettingTheLoan = writable(false);
export const isSendingTheLoan = writable(false);
