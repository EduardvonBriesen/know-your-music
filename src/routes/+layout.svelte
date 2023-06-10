<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.css';

	import Header from '../components/Header.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
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
				};
			});
		});
	});
</script>

<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>

	<main>
		<slot />
	</main>
</AppShell>
