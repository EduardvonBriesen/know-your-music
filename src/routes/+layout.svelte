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
	//import {initDataStructure} from "../store/data_structure"
	import {addNewHistory,saveHistory,initDataStructure} from "../store/dataBaseLoadings"

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
				//signup
				const userRef = doc(db, 'users', user.uid);
				/* dataToSetStore = {
					email: user.email,
					createdAt: new Date(),
					updatedAt: new Date()
				}; */
				dataToSetStore = initDataStructure("tbd_name", user.email);
				await setDoc(userRef, dataToSetStore, { merge: true });
			} else {
				//login
				const userData = docSnap.data();
				dataToSetStore = userData;
				//saving new log
				//was the user already logged at this day -> add new session
				//it is the first login of the user at this day -> add new history
				addNewHistory(user.uid, db, userData);
				
			}

			authStore.update((store) => {
				return {
					...store,
					user
				};
			});
			
			
			// authStore.user.uid
		});
	});

	const logout = () => {
		// src/routes/quiz/biography/+page.svelte anpassen
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				const uid = user.uid;
				//Save logout time for calculation of duration of the active session
				saveHistory(uid,db);
			} else {
				// User is signed out
			}
		});
		//this timeout is out of some reassons needed so that the log is done before logout
		setTimeout(authHandler.logout,500);
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
