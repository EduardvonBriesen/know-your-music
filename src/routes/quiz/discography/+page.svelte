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
	}

	$: console.log(form);
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
				use:dndzone={{
					items,
					flipDurationMs,
					dropTargetStyle: { outline: 'none' },
					dragDisabled: !!form
				}}
				on:consider={handleDndConsider}
				on:finalize={handleDndFinalize}
			>
				{#each items as item (item.id)}
					<div class="flex flex-col items-center" animate:flip={{ duration: flipDurationMs }}>
						<Avatar
							class="w-auto aspect-square"
							rounded="rounded-xl"
							border={!form
								? ''
								: form?.result.get(item.name).correct
								? 'border-4 border-success-500'
								: 'border-4 border-error-500'}
							cursor={!form ? 'cursor-pointer' : 'cursor-default'}
							src={item.image}
							alt={item.name}
						/>
						<p class="text-center line-clamp-1">{item.name}</p>
						{#if form}
							{#if form?.result.get(item.name).correct}
								<span class="text-success-500">{form?.result.get(item.name).date}</span>
							{:else}
								<span class="text-error-500">{form?.result.get(item.name).date}</span>
							{/if}
						{/if}
					</div>
				{/each}
			</section>

			<footer class="card-footer flex flex-col items-center">
				{#if !form}
					<button class="btn variant-filled-primary w-fit" type="submit">Submit</button>
				{:else}
					<p class="text-center">
						You scored <span class="text-primary-500">{form?.score}</span> out of
						<span class="text-primary-500">{form?.result.size}</span> points!
					</p>
					<button
						class="btn variant-filled-primary w-fit"
						type="button"
						on:click={() => {
							window.location.reload();
						}}>Try Again</button
					>
				{/if}
			</footer>
		</form>
	</div>
</div>
