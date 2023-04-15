import { writable } from 'svelte/store';

type NotificationType = 'success' | 'error';

interface Notification {
	text: string;
	type: NotificationType;
  timeout?: number;
}

const DEFAULT_TIMEOUT_MS = 2000; 

export const notifications = writable<Notification[]>([]);

export const toast = (not: Notification) => {
	notifications.update((state) => [not, ...state]);
  setTimeout(() => {
    popToast();
  }, not.timeout ?? DEFAULT_TIMEOUT_MS);
};


const popToast = () => {
  notifications.update((state) => {
    return state.slice(0, state.length - 1);
  });
};