<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store';
	import { Avatar } from '@skeletonlabs/skeleton';

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
						{#if i < data.artist?.summary.split('<input />').length - 1 && !form?.artist}
							<input class="input w-24 px-2" bind:value={guess} name="answer" />
						{:else if i < data.artist?.summary.split('<input />').length - 1 && form?.artist}
							<em class="font-bold">{form.artist}</em>
						{/if}
					{/each}
				</p>
			</section>
			<footer class="card-footer flex flex-col items-center">
				<button class="btn variant-filled-primary w-fit" type="submit">Submit</button>
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
