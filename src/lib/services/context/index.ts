// Inspired by https://www.npmjs.com/package/svelte-typed-context?activeTab=readme
import { getContext as svelteGetContext, setContext as svelteSetContext } from 'svelte';

import type IServicesContext from './IServicesContext';

type getContext = <K extends keyof IServicesContext>(key: K) => IServicesContext[K];
type setContext = (
  key: keyof IServicesContext,
  context: IServicesContext[keyof IServicesContext],
) => void;

export const getContext: getContext = svelteGetContext as getContext;
export const setContext: setContext = svelteSetContext as setContext;
