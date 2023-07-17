<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import {  animateHandler, authStore } from '../../../store/store';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { invalidateAll } from '$app/navigation';

	export let data;
	export let form;

	let user_id = '';
	let guess = '';

	authStore.subscribe((store) => {
		user_id = store.user.uid;
	});

	$: feedback = '';

	const positiveFeedback = ['Good job!', 'Amazing!', 'Correct answer, keep going!'];

	const negativeFeedback = [
		'Oups, the correct answer is ',
		'Wrong answer. The correct answer is: ',
		'Not quite there. The correct answer is: '
	];

	$: {
		if (form?.correct) {
			feedback = positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];
		} else {
			feedback = negativeFeedback[Math.floor(Math.random() * negativeFeedback.length)];
		}
	}

	const reload = async () => {
		await invalidateAll();
		animateHandler.animate();
		form = null;
	};
</script>

<header class="card-header flex flex-col items-center">
	{#if !form}
		<h3 class="h4 p-6 pb-4">Who hides behind this Bio?</h3>
	{:else}
		{#if form?.image}
			<Avatar class="m-2" rounded="rounded-xl" width="w-1/3" src={form?.image} alt={form?.artist} />
		{/if}
		<h3 class="h3 font-bold">{form?.artist}</h3>
	{/if}
</header>
<form
	method="POST"
	action="?/guess"
	use:enhance={({ formData }) => {
		formData.set('user_id', user_id);
	}}
>
	<section class="p-6 flex flex-col items-center gap-4">
		<p class="text-justify mt-0">
			{#if !form}
				{#each data.bio?.split('<input />') || [] as slice}
					{@html slice}
					{#if slice !== data.bio?.split('<input />')[data.bio?.split('<input />').length - 1]}
						<input bind:value={guess} class="input w-24 px-2" name="answer" autocomplete="off" />
					{/if}
				{/each}
			{:else if form?.correct}
				<div class="[&>em]:font-bold [&>em]:text-primary-500">
					{@html form.bio}
				</div>
			{:else}
				<div class="[&>em]:font-bold [&>em]:text-error-500">
					{@html form.bio}
				</div>
			{/if}
		</p>
		{#if !form}
			{#if data.options && data.options.length > 0}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					{#each data.options as option}
						<button
							class="btn btn-lg variant-glass-surface whitespace-pre-wrap"
							type="submit"
							name="answer"
							value={option}
							disabled={!!form}
						>
							<span class="text-sm">{option}</span>
						</button>
					{/each}
				</div>
			{:else}
				{#if data.bio?.split('<input').length === 1}
					<input
						bind:value={guess}
						class="input px-2 w-48"
						name="answer"
						disabled={!!form}
						autocomplete="off"
					/>
				{/if}
				<div class="flex justify-center items-center w-full gap-2">
					<button
						class="btn variant-filled-secondary w-fit"
						type="submit"
						disabled={guess.length < 1}>Submit</button
					>
					<form
						action="?/hint"
						method="POST"
						use:enhance={({ formData }) => {
							formData.set('user_id', user_id);
						}}
					>
						<button class="btn variant-soft-secondary" type="submit"> Get Help </button>
					</form>
				</div>
			{/if}
		{/if}
	</section>

	{#if !!form}
		<footer
			class="card-footer flex flex-col p-0 rounded-bl-container-token rounded-br-container-token items-center ring-outline-token"
			class:bg-success-200={!!form && form?.correct}
			class:bg-error-200={!!form && !form?.correct}
		>
			<div class="flex justify-between items-center w-full p-6">
				{#if data.artist?.summary.split('<input').length === 1}
					<input bind:value={guess} class="input px-2 w-48 m-2" name="answer" disabled={!!form} />
				{/if}
				{#if form?.correct}
					<span class="w-3/4 font-bold text-success-500">{feedback}</span>
				{:else}
					<span class="w-3/4 font-bold text-error-500">{feedback} {form?.artist}</span>
				{/if}
				<button
					class="btn w-fit"
					class:variant-filled-success={form?.correct}
					class:variant-filled-error={!form?.correct}
					type="button"
					on:click={reload}
					>Continue
				</button>
			</div>
		</footer>
	{/if}
</form>

{#if form?.correct}
	<div
		style="position: absolute; left: 50%; top: 30%"
		use:confetti={{
			force: 0.7,
			stageWidth: window.innerWidth,
			stageHeight: window.innerHeight
		}}
	/>
{/if}
