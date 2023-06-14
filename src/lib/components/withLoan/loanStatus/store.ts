import type { LoanStatusResponse } from 'pluto-loans-sdk';
import { writable } from 'svelte/store';

export const loanStatus = writable<LoanStatusResponse>();
