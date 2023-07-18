<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { AppBar, AppShell, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase/firebase';
	import { doc, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
	import { authHandler, authStore } from '../store/store';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { addNewHistory, saveHistory, initDataStructure } from '../lib/firebase/dataBaseLoadings';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import Blobs from '../components/Blobs.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

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

			if (!user) {
				authStore.set({ user: {} });
				return;
			}

			let dataToSetStore: DocumentData;
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				//signup
				const userRef = doc(db, 'users', user.uid);
				dataToSetStore = initDataStructure('tbd_name', user.email);
				await setDoc(userRef, dataToSetStore, { merge: true });
			} else {
				//login
				const userData = docSnap.data();
				dataToSetStore = userData;
				addNewHistory(user.uid, db, userData);
			}

			authStore.update((store) => {
				return {
					...store,
					user
				};
			});
		});

		return unsubscribe;
	});

	const logout = async () => {
		let user_id = '';
		authStore.subscribe((store: any) => {
			user_id = store.user.uid;
		});
		await saveHistory(user_id, db);
		authHandler.logout();
	};

	let comboboxValue: string;

	const popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'popupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="px-8 shadow-sm !variant-soft-surface">
			<svelte:fragment slot="lead">
				<a href="/">
					<img class="absolute top-3.5 h-8 overflow-visible" src="/images/Logo_navbar.svg" alt="logo">
				  </a>
				<a class="absolute top-5 text-secondary-500 text-2xl font-bold ml-20" href="/">Know Your Music</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<nav class="mt-12 sm:mt-0">
					<button class="btn variant-soft-secondary btn-sm" use:popup={popupCombobox}>
						<span class="capitalize">{comboboxValue ?? 'Quiz'}</span>
						<span>↓</span>
					</button>
					<div class="card " data-popup="popupCombobox">
						<ListBox class="p-1">
							<a href="/quiz/biography">
								<ListBoxItem bind:group={comboboxValue} name="medium" value="Bio">
									Biography
								</ListBoxItem>
							</a>
							<a href="/quiz/covers">
								<ListBoxItem bind:group={comboboxValue} name="medium" value="Covers">
									Covers
								</ListBoxItem>
							</a>
							<a href="/quiz/discography">
								<ListBoxItem bind:group={comboboxValue} name="medium" value="Discography">
									Discography
								</ListBoxItem>
							</a>
							<a href="/quiz/lyrics">
								<ListBoxItem bind:group={comboboxValue} name="medium" value="Lyrics">
									Lyrics
								</ListBoxItem>
							</a>
							<a href="/quiz/popularity">
								<ListBoxItem bind:group={comboboxValue} name="medium" value="Popularity">
									Popularity
								</ListBoxItem>
							</a>
							<a href="/quiz/song">
								<ListBoxItem bind:group={comboboxValue} name="medium" value="Song">
									Song
								</ListBoxItem>
							</a>
						</ListBox>
					</div>
					<button class="btn variant-soft-secondary btn-sm">
						<a href="/stats">Stats</a>
					</button>
					<button class="btn variant-soft-secondary btn-sm">
						<a href="/about">About</a>
					</button>
					<button
						on:click={logout}
						class="btn variant-filled-secondary btn-sm"
						class:invisible={!$authStore.user.uid}
					>
						Logout
					</button>
				</nav>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<main>
		<slot />
	</main>
	<Blobs color="magenta" />
</AppShell>
