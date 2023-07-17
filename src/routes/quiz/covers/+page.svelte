<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { invalidateAll } from '$app/navigation';

	export let data;
	export let form;

	let user_id = '';

	authStore.subscribe((store) => {
		user_id = store.user.uid;
	});

	let feedback = '';

	const positiveFeedback = ['Good job!', 'Amazing!', 'Correct answer, keep going!'];

	const negativeFeedback = [
		'Oups, the correct answer is ',
		'Wrong answer. The correct answer is: ',
		'Not quite there. The most popular track is: '
	];

	$: {
		if (form?.false === null && form?.correct !== null) {
			feedback = positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];
		} else {
			feedback =
				negativeFeedback[Math.floor(Math.random() * negativeFeedback.length)] + form?.correct;
		}
	}

	const reload = async () => {
		await invalidateAll();
		form = null;
	};
</script>

<header class="card-header flex flex-col items-center">
	<Avatar
		class="m-2"
		rounded="rounded-xl"
		width="w-1/2"
		src={!!form ? form.cover : data.cover}
		alt="cover"
	/>
	<div class="h4 mt-6 mb-0 flex items-center">
		<span class="mr-2">Do you know the name of this album?</span>
	</div>
</header>
<section class="p-4">
	<form
		method="POST"
		use:enhance={({ formData }) => {
			formData.set('user_id', user_id);
		}}
	>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			{#each data.albums ?? [] as albumItem}
				<button
					class="btn disabled:opacity-100"
					class:variant-glass-surface={form?.correct !== albumItem.name &&
						form?.false !== albumItem.name}
					class:variant-filled-success={form?.correct === albumItem.name}
					class:variant-filled-error={form?.false === albumItem.name}
					type="submit"
					name="answer"
					value={albumItem.name}
					disabled={!!form}
				>
					<span class="text-sm break-words whitespace-normal">{albumItem.name}</span>
				</button>
			{/each}
		</div>
	</form>
</section>
{#if !!form}
	<footer
		class="card-footer flex flex-col p-0 rounded-bl-container-token rounded-br-container-token items-center ring-outline-token"
		class:bg-success-200={!form?.false}
		class:bg-error-200={form?.false}
	>
		<div class="flex justify-between items-center w-full p-6">
			{#if form?.false === null}
				<span class="w-3/4 font-bold text-success-500">{feedback}</span>
			{:else if form?.false !== null}
				<span class="w-3/4 font-bold text-error-500">{feedback}</span>
			{/if}
			<button
				class="btn w-fit"
				class:variant-filled-success={!form?.false}
				class:variant-filled-error={form?.false}
				on:click={reload}>Continue</button
			>
		</div>
	</footer>
{/if}
{#if form?.false === null}
	<div
		style="position: absolute; left: 50%; top: 30%"
		use:confetti={{
			force: 0.7,
			stageWidth: window.innerWidth,
			stageHeight: window.innerHeight
		}}
	/>
{/if}

<style>
	.question {
		font-size: 1.3rem;
		margin-top: 1rem;
		text-align: center;
	}
</style>
