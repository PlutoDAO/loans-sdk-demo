import { writable } from 'svelte/store';

import type IBorrower from './IBorrower';

export const borrower = writable<IBorrower>();
export const isUserConnected = writable(false);
