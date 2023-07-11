<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store';
	import { Avatar } from '@skeletonlabs/skeleton';

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
</script>

<div class="flex place-content-center">
	<div class="card p-0 w-2/3 text-token bg-surface-50 space-4 m-12">
		<header class="card-header flex flex-col items-center">
			{#if !form}
				<h3 class="h4 p-6 pb-4">Who hides behind this Bio?</h3>
			{:else}
				{#if form?.image}
					<Avatar
						class="m-2"
						rounded="rounded-xl"
						width="w-1/3"
						src={form?.image}
						alt={form?.artist}
					/>
				{/if}
				<h3 class="h3 font-bold">{form?.artist}</h3>
			{/if}
		</header>
		<form
			method="POST"
			use:enhance={({ formData }) => {
				formData.set('user_id', user_id);
			}}
		>
			<section class="p-6">
				<p class="text-justify mt-0">
					{#if !form}
						{#each data.bio?.split('<input />') || [] as slice}
							{@html slice}
							{#if slice !== data.bio?.split('<input />')[data.bio?.split('<input />').length - 1]}
								<input
									bind:value={guess}
									class="input w-24 px-2"
									name="answer"
									autocomplete="off"
								/>
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
			</section>
			<footer
				class="card-footer flex flex-col p-0 rounded-bl-container-token rounded-br-container-token items-center ring-outline-token {!form
					? ''
					: form?.correct
					? 'bg-success-200'
					: 'bg-error-200'}"
			>
				{#if !form}
					{#if data.options && data.options.length > 0}
						<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
							{#each data.options as option}
								<button
									class="btn disabled:opacity-100 variant-filled-primary"
									type="submit"
									name="answer"
									value={option}
									disabled={!!form}
								>
									<span class="text-sm line-clamp-1">{option}</span>
								</button>
							{/each}
						</div>
					{:else}
						{#if data.bio?.split('<input').length === 1}
							<input
								bind:value={guess}
								class="input px-2 w-48 m-2"
								name="answer"
								disabled={!!form}
								autocomplete="off"
							/>
						{/if}
						<div class="flex justify-center items-center w-full p-6">
							<button
								class="btn variant-filled-surface w-fit"
								type="submit"
								disabled={guess.length < 1}>Submit</button
							>
						</div>
					{/if}
				{:else}
					<div class="flex justify-between items-center w-full p-6">
						{#if data.artist?.summary.split('<input').length === 1}
							<input
								bind:value={guess}
								class="input px-2 w-48 m-2"
								name="answer"
								disabled={!!form}
							/>
						{/if}
						{#if form?.correct}
							<span class="w-3/4 font-bold text-success-500">{feedback}</span>
						{:else}
							<span class="w-3/4 font-bold text-error-500">{feedback} {form?.artist}</span>
						{/if}
						<button
							class="btn w-fit {form?.correct ? 'variant-filled-success' : 'variant-filled-error'}"
							type="button"
							on:click={() => {
								window.location.reload();
							}}
							>Continue
						</button>
					</div>
					</div>
				{/if}
			</footer>
		</form>
	</div>
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
</div>
