import { writable } from 'svelte/store';

export const loanXdr = writable<string>();
export const signedXdr = writable<string>();
export const error = writable<string>();
