<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store';

	export let data;
	export let form;

	let user_id = '';

	authStore.subscribe((store) => {
		user_id = store.user.uid;
	});

	$: feedback = '';

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

	import { Avatar, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

	let start: number;

	const startTimer = () => {
		if (!start) start = Date.now();
	};
</script>

<header class="card-header flex flex-col items-center">
	<Avatar
		class="m-2"
		rounded="rounded-xl"
		width="w-1/2"
		src={form ? form.image : ''}
		initials={'?'}
		alt={'cover'}
	/>
	<div class="h4 m-6 flex items-center">
		<span class="mr-2">How fast can you guess this track?</span>
		<div class="[&>*]:pointer-events-none" use:popup={popupHover}>
			<span class="badge-icon variant-soft-surface"> i </span>
		</div>
		<div class="card p-2 variant-filled-surface" data-popup="popupHover">
			<p class="text-sm">Time is measured from when you press start.</p>
			<div class="arrow variant-filled-surface" />
		</div>
	</div>
	<audio
		class="w-1/2"
		src={data.trackPreview}
		controls
		controlslist="noplaybackrate nodownload"
		on:play={startTimer}
	/>
</header>
<section class="m-6">
	<form
		method="POST"
		use:enhance={({ formData }) => {
			formData.set('user_id', user_id);
			formData.set('time', JSON.stringify(Date.now() - start));
		}}
	>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#each data.options ?? [] as option}
				<button
					class="btn btn-lg disabled:opacity-100"
					class:variant-soft-surface={form?.correct !== option.name && form?.false !== option.name}
					class:variant-filled-success={form?.correct === option.name}
					class:variant-filled-error={form?.false === option.name}
					type="submit"
					name="answer"
					value={option.id}
					disabled={!!form}
				>
					<span class="text-sm break-words whitespace-normal">{option.name}</span>
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
			<span
				class="w-1/2 font-bold"
				class:text-success-500={!form?.false}
				class:text-error-500={form?.false}
				>{feedback}
				<br />
				It took you only {form?.time} s
			</span>

			<button
				class="btn w-fit"
				class:variant-filled-success={!form?.false}
				class:variant-filled-error={form?.false}
				on:click={() => window.location.reload()}>Continue</button
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
