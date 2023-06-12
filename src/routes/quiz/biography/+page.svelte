<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store';

	export let data;
	export let form;

	let user_id: string = '';
	let guess: string = '';

	authStore.subscribe((store: any) => {
		user_id = store.user.uid;
	});
</script>

<div class="flex place-content-center">
	<div class="card p-4 w-2/3 text-token space-4 m-10">
		<header class="card-header flex flex-col items-center">
			<h3 class="h3">Who hides behind this Bio?</h3>
		</header>
		<form
			method="POST"
			use:enhance={({ formData }) => {
				formData.set('user_id', user_id);
			}}
		>
			<section class="p-4">
				<p class="text-justify">
					{#each data.artist?.summary.split('<input />') as text, i}
						{text}
						{#if i < data.artist?.summary.split('<input />').length - 1 && !form}
							<input class="input w-24 px-2" bind:value={guess} name="answer" />
						{:else if i < data.artist?.summary.split('<input />').length - 1 && form?.correct}
							<em class="font-bold text-primary-500">{form.artist}</em>
						{:else if i < data.artist?.summary.split('<input />').length - 1 && form?.correct === false}
							<em class="font-bold text-error-500">{form.artist}</em>
						{/if}
					{/each}
				</p>
			</section>
			<footer class="card-footer flex flex-col items-center">
				{#if form?.correct}
					<span class="text-center">Thats Right!</span>
				{:else if form?.correct === false}
					<span class="text-center">Thats Wrong!</span>
				{/if}

				{#if !form}
					<button class="btn variant-filled-primary w-fit" type="submit">Submit</button>
				{:else}
					<button
						class="btn variant-filled-success w-fit"
						type="button"
						on:click={() => {
							window.location.reload();
						}}>Try Again</button
					>
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
