<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store.js';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { invalidateAll } from '$app/navigation';

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

	let feedback = '';

	const positiveFeedback = ['Good job!', 'Amazing!', 'Correct answer, keep going!'];

	const negativeFeedback = ['Oups!', 'Wrong answer.', 'Not quite there.'];

	$: {
		if (form?.correct) {
			feedback = positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];
		} else {
			feedback = negativeFeedback[Math.floor(Math.random() * negativeFeedback.length)];
		}
	}

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	const reload = async () => {
		form = null;
		await invalidateAll();
	};
</script>

<header class="card-header flex flex-col items-center">
	<Avatar
		class="m-2"
		rounded="rounded-xl"
		width="w-1/3"
		src={data.artist?.image}
		alt={data.artist?.name}
	/>
	<h3 class="h3 font-bold">{data.artist?.name}</h3>
	<div class="mt-6 flex items-center">
		<span class="h4 mr-2">In what order were these albums released?</span>
		<div class="[&>*]:pointer-events-none" use:popup={popupHover}>
			<span class="badge-icon variant-soft-surface"> i </span>
		</div>
		<div class="card p-2 variant-filled-surface" data-popup="popupHover">
			<p class="text-sm">From oldest to newest, left to right</p>
			<div class="arrow variant-filled-surface" />
		</div>
	</div>
</header>
<form
	method="POST"
	use:enhance={({ formData }) => {
		formData.set('user_id', user_id);
		formData.set('answer', JSON.stringify(items.map((item) => item.name)));
	}}
>
	<section
		class="flex flex-row justify-center gap-4 p-6"
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
					border={!!form
						? form?.result.get(item.name).correct
							? 'border-4 border-success-500'
							: 'border-4 border-error-500'
						: ''}
					cursor={!form ? 'cursor-pointer' : 'cursor-default'}
					src={item.image}
					alt={item.name}
				/>
				<p class="text-center line-clamp-1">{item.name}</p>
				{#if !!form}
					{#if form?.result.get(item.name).correct}
						<span class="text-success-500">{form?.result.get(item.name).date}</span>
					{:else}
						<span class="text-error-500">{form?.result.get(item.name).date}</span>
					{/if}
				{/if}
			</div>
		{/each}
	</section>

	<footer
		class="card-footer flex flex-col p-0 rounded-bl-container-token rounded-br-container-token items-center ring-outline-token {!form
			? ''
			: form?.correct
			? 'bg-success-200'
			: 'bg-error-200'}"
	>
		{#if !form}
			<div class="flex justify-center items-center w-full p-6">
				<button class="btn variant-filled-surface w-fit" type="submit">Submit</button>
			</div>
		{:else}
			<div class="flex justify-between items-center w-full p-6">
				<p class="text-center">
					You scored <span class="text-primary-500">{form?.score}</span> out of
					<span class="text-primary-500">{form?.result.size}</span> points!
				</p>
				<button
					class="btn w-fit {form?.correct ? 'variant-filled-success' : 'variant-filled-error'}"
					type="button"
					on:click={reload}
				>
					Continue
				</button>
			</div>
		{/if}
	</footer>
</form>
