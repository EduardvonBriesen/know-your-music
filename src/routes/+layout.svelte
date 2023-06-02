<script lang="ts">
	import Header from '../Components/Header.svelte';
	import './styles.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase/firebase';
	import { doc, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
	import { authStore } from '../store/store';

	onMount(() => {
		console.log('mounted');
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;

			if (!user && currentPath !== '/login') {
				window.location.href = '/login';
				return;
			}

			if (user && currentPath === '/login') {
				window.location.href = '/';
				return;
			}

			if (!user) return;

			let dataToSetStore: DocumentData;
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				const userRef = doc(db, 'user', user.uid);
				(dataToSetStore = {
					email: user.email,
					createdAt: new Date(),
					updatedAt: new Date()
				}),
					await setDoc(userRef, dataToSetStore, { merge: true });
			} else {
				const userData = docSnap.data();
				dataToSetStore = userData;
			}

			authStore.update((store) => {
				return {
					...store,
					user,
					data: dataToSetStore,
					loading: false
				};
			});
		});
	});
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
