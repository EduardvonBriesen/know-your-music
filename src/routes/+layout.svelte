<script lang="ts">
	
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';


	import { AppBar, AppShell, ListBox, ListBoxItem} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase/firebase';
	import { doc, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
	import { authHandler, authStore } from '../store/store';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	import { addNewHistory, saveHistory, initDataStructure } from '../lib/firebase/dataBaseLoadings';

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


	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
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
		<style>
			.navbarr {
				background-color: #ffffff; 
			}
		</style>
		<AppBar class="navbarr px-8 shadow-sm">
			<svelte:fragment slot="lead">
				<!--<img class="h-6 w-6 mr-4" src="/images/Facebook_logo_(square).png" alt="Logo"/> -->
				<a class="text-[#775AFF] text-2xl font-bold" href="/">Know Your Music</a>
			</svelte:fragment>			
			<svelte:fragment slot="trail">
				<nav>
					<button class="rounded-xl h-8 px-4 justify-between bg-[#ffffff] hover:bg-[#E9E9E9] duration-300" use:popup={popupCombobox}>
						<span class="capitalize">{comboboxValue ?? 'Quiz'}</span>
						<span>↓</span>
					</button>
					<div class="card shadow-xl bg-[#ffffff] " data-popup="popupCombobox">
						<ListBox rounded="rounded-none">
							<a href="/quiz/popularity">
								<ListBoxItem bind:group={comboboxValue} name="medium" value="Popularity">
									Popularity
								</ListBoxItem>
							</a>
							<a href="/quiz/biography">
								<ListBoxItem bind:group={comboboxValue} name="medium" value="Bio">
									Bio
								</ListBoxItem>
							</a>
							<a href="/quiz/discography">
								<ListBoxItem bind:group={comboboxValue} name="medium" value="Discography">
									Discography
								</ListBoxItem>
							</a>							
						</ListBox>
						<div class="arrow bg-surface-100-800-token" />
					</div>
					<button class="rounded-xl h-8 px-4 bg-[#ffffff] hover:bg-[#E9E9E9] duration-300">
						<a href="/stats">Stats</a>
					</button>
					<button class="rounded-xl h-8 px-4 bg-[#ffffff] hover:bg-[#E9E9E9] duration-300">
						<a href="/team">Team</a>
					</button>
					<button class="rounded-xl h-8 px-4 bg-[#ffffff] hover:bg-[#E9E9E9] duration-300">
						<a href="">About</a>
					</button>
				</nav>
				<button on:click={logout} class="text-white rounded-xl h-8 px-4 bg-[#775AFF] hover:bg-[#6A4AFF] duration-300" class:invisible={!$authStore.user.uid}> Logout </button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<main>
		<slot />
	</main>
</AppShell>


