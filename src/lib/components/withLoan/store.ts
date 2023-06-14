import { writable } from 'svelte/store';

export const error = writable<string>();
export const unsignedXdr = writable<string>();
