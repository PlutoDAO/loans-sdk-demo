import { writable } from 'svelte/store';

import type IBorrower from './IBorrower';

export const publicKey = writable<string>();
export const borrower = writable<IBorrower>();
