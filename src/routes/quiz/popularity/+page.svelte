<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store';

	export let data;
	export let form;

	let user_id = '';

	authStore.subscribe((store) => {
		user_id = store.user.uid;
	});

	$: feedback = ""

	const positiveFeedback = [
		"Good job!",
		"Amazing!",
		"Correct answer, keep going!"
 	];

	const negativeFeedback = [
    	"Oups, the correct answer is ",
    	"Wrong answer. The correct answer is: ",
    	"Not quite there. The most popular track is: "
 	];

	$: {
		if (form?.false === null && form?.correct !== null) {
			feedback = positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];
		} else {
			feedback = negativeFeedback[Math.floor(Math.random() * negativeFeedback.length)] + form?.correct;
		}
	}

	import { popup } from '@skeletonlabs/skeleton';
import type { PopupSettings } from '@skeletonlabs/skeleton';
const popupHover: PopupSettings = {
	event: 'hover',
	target: 'popupHover',
	placement: 'top'
};

</script>

<div class="flex place-content-center">
	<div class="card w-2/3 text-token space-4 m-12">
		<header class="card-header flex flex-col items-center">
			<Avatar
				class="m-2"
				rounded="rounded-xl"
				width="w-1/3"
				src={data.artist?.image}
				alt={data.artist?.name}
			/>
			<h3 class="h3 font-bold">{data.artist?.name}</h3>
			<div class="h3 mt-6 mb-0 flex items-center">
				<span class="mr-2">Which of the following tracks is most popular?</span>
				<div class="[&>*]:pointer-events-none" use:popup={popupHover}>
					<span class="badge-icon variant-soft-surface"> i </span>
				</div>
				<div class="card p-2 variant-filled-surface" data-popup="popupHover">
					<p class="text-sm">Popularity is measured by the number of streams</p>
					<div class="arrow variant-filled-surface" />
				</div>
			</div>
		</header>
		<section class="p-6 pt-4 pb-8">
			<form
				method="POST"
				use:enhance={({ formData }) => {
					formData.set('user_id', user_id);
				}}
			>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
					{#each data.tracks ?? [] as track}
						<button
							class="btn btn-lg disabled:opacity-100"
							class:variant-soft-surface={form?.correct !== track.name &&
								form?.false !== track.name}
							class:variant-filled-success={form?.correct === track.name}
							class:variant-filled-error={form?.false === track.name}
							type="submit"
							name="answer"
							value={track.name}
							disabled={!!form}
						>
							<span class="text-sm break-words whitespace-normal">{track.name}</span>
						</button>
					{/each}
				</div>
			</form>
		</section>
		{#if !!form}
			<footer class="card-footer flex flex-col p-0 rounded-bl-container-token rounded-br-container-token items-center ring-outline-token {form?.false === null ? 'bg-success-200' : 'bg-error-200'}">
				<div class="flex justify-between items-center w-full p-6">
					{#if form?.false === null}
						<span class="w-3/4 font-bold text-success-500">{feedback}</span>
					{:else if form?.false !== null}
						<span class="w-3/4 font-bold text-error-500">{feedback}</span>
					{/if}
					<button class="btn w-fit {form?.false === null ? 'variant-filled-success' : 'variant-filled-error'}" on:click={() => window.location.reload()}>Continue</button> 
				</div>
			</footer>
		{/if}
	</div>
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
</div>
