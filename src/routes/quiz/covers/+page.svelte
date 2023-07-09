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
</script>

<style>
	.album-cover {
		filter: blur(3px);
	}

	.album-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
	}

	.question {
		font-size: 1.3rem;
		margin-top: 1rem;
		text-align: center;
	}
</style>

{#if data && data.albums && data.albums.length > 0}
	<div class="flex place-content-center">
		<div class="card w-2/3 space-4 m-10 variant-glass-surface">
			<header class="album-container">
				<img class="w-1/2 aspect-square rounded-xl album-cover" src={data.albums[0].image} alt={data.albums[0].name} />
				<p class="question">Which album is this?</p>
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
								class:variant-filled-primary={form?.correct !== albumItem.name && form?.false !== albumItem.name}
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
				<footer class="card-footer flex flex-col items-center">
					{#if form?.false === null}
						<span class="text-center">You chose correct!</span>
					{:else if form?.false !== null}
						<span class="text-center">You chose incorrect!</span>
					{/if}
					<button class="btn variant-filled-primary w-fit" on:click={() => window.location.reload()}>Play again</button>
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
{/if}






