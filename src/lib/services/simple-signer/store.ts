import { writable } from 'svelte/store';

export const publicKey = writable<string>();
export const signedXdr = writable<string>();
