import { auth } from '$lib/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { writable } from 'svelte/store';

export const authStore = writable({
	user: {
		uid: ''
	}
});

export const authHandler = {
	signup: async (email: string, pass: string) => {
		await createUserWithEmailAndPassword(auth, email, pass);
	},
	login: async (email: string, pass: string) => {
		await signInWithEmailAndPassword(auth, email, pass);
		//add logs
	},
	logout: async () => {
		//add logs
		await signOut(auth);
	}
};

export const animateStore = writable({
	animate: false
});

export const animateHandler = {
	animate: () => {
		animateStore.update((state) => {
			return { animate: !state.animate };
		});
	}
};