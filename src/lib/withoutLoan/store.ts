import { writable } from 'svelte/store';

import type IAccount from './IAccount';

export const borrower = writable<IAccount>();
