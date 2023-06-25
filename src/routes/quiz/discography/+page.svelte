<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store.js';

	export let data;
	export let form;

	let user_id: string = '';

	authStore.subscribe((store: any) => {
		user_id = store.user.uid;
	});

	let items = [{ id: 1, name: 'item1', image: '' }];
	const flipDurationMs = 300;

	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
	}

	$: {
		if (data.albums) {
			items = data.albums.map((album, index) => {
				return { id: index, name: album.name, image: album.image };
			});
		}
		// console.log(items);
	}
</script>

<div class="flex place-content-center">
	<div class="card w-2/3 space-4 m-10 variant-glass-surface">
		<header class="card-header flex flex-col items-center">
			<Avatar
				rounded="rounded-xl"
				width="w-1/3"
				cursor="cursor-pointer"
				src={data.artist?.image}
				alt={data.artist?.name}
			/>
			<h3 class="h3">{data.artist?.name}</h3>
			<span class="text-center">In what order were these albums released?</span>
		</header>
		<form
			method="POST"
			use:enhance={({ formData }) => {
				formData.set('user_id', user_id);
				formData.set('answer', JSON.stringify(items.map((item) => item.name)));
			}}
		>
			<section
				class="flex flex-row justify-evenly gap-4 p-4"
				use:dndzone={{ items, flipDurationMs, dropTargetStyle: { outline: 'none' } }}
				on:consider={handleDndConsider}
				on:finalize={handleDndFinalize}
			>
				{#each items as item (item.id)}
					<div class="flex flex-col items-center" animate:flip={{ duration: flipDurationMs }}>
						<Avatar
							class="w-auto aspect-square max-h-64"
							rounded="rounded-xl"
							cursor="cursor-pointer"
							src={item.image}
							alt={item.name}
						/>
						<p class="text-center line-clamp-2">{item.name}</p>
					</div>
				{/each}
			</section>

			<footer class="card-footer flex flex-col items-center">
				<!-- {#if !form} -->
				<button class="btn variant-filled-primary w-fit" type="submit">Submit</button>
				<!-- {/if} -->
			</footer>
		</form>
	</div>
</div>
