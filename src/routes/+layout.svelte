<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.css';

	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase/firebase';
	import { doc, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
	import { authHandler, authStore } from '../store/store';

	onMount(() => {
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
				const userRef = doc(db, 'users', user.uid);
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
					user
				};
			});
		});
	});

	const logout = () => {
		authHandler.logout();
	};
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">know your music.</svelte:fragment>
			<nav>
				<a class="btn variant-soft" href="/quiz/popularity">Popularity Quiz</a>
				<a class="btn variant-soft" href="/quiz/biography">Bio Quiz</a>
				<a class="btn variant-soft" href="/stats">Stats</a>
			</nav>
			<svelte:fragment slot="trail">
				<button on:click={logout} class="btn variant-ghost"> Logout </button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<main>
		<slot />
	</main>
</AppShell>
