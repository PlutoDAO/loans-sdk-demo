import { writable } from 'svelte/store';

import type IBorrower from './IBorrower';

export const borrower = writable<IBorrower>();
