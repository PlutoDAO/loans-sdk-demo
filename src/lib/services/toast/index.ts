import { toast as toastController } from '@zerodevx/svelte-toast';
import type { SvelteToastOptions } from '@zerodevx/svelte-toast/stores';

const toastThemes = {
  error: {
    '--toastColor': 'white',
    '--toastBackground': '#b75656',
    '--toastBarBackground': '#ed7f7f',
  },
  success: {
    '--toastColor': 'white',
    '--toastBackground': '#40b34e',
    '--toastBarBackground': '#77d983',
  },
};

function pushToast(options: SvelteToastOptions) {
  toastController.pop();
  toastController.push(options);
}

function loadingToast(msg: string) {
  pushToast({ msg, initial: 0, next: 1, duration: 10000 });
}

function errorToast(msg: string) {
  pushToast({ msg, duration: 10000, theme: toastThemes.error });
}

function successToast(msg: string) {
  pushToast({ msg, duration: 1000, theme: toastThemes.success });
}

export default {
  loading: loadingToast,
  error: errorToast,
  success: successToast,
};
