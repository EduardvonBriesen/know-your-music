import { auth } from '$lib/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { writable } from 'svelte/store';

export const authStore = writable({
	user: {},
	data: {}
});

export const authHandler = {
	signup: async (email: string, pass: string) => {
		await createUserWithEmailAndPassword(auth, email, pass);
	},
	login: async (email: string, pass: string) => {
		await signInWithEmailAndPassword(auth, email, pass);
	},
	logout: async () => {
		await signOut(auth);
	}
};
