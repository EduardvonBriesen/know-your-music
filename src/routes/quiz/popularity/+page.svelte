<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store';

	export let data;
	export let form;

	let user_id: string = '';

	authStore.subscribe((store: any) => {
		user_id = store.user.uid;
	});
</script>

<div class="flex place-content-center">
	<div class="card p-4 w-2/3 text-token space-4 m-10">
		<header class="card-header flex flex-col items-center">
			<Avatar
				rounded="rounded-xl"
				width="w-1/3"
				cursor="cursor-pointer"
				src={data.artist?.image}
				alt={data.artist?.name}
			/>
			<h3 class="h3">{data.artist?.name}</h3>
			<span class="text-center">Which of the following tracks is most popular?</span>
		</header>
		<section class="p-4">
			<form
				method="POST"
				use:enhance={({ formData }) => {
					formData.set('user_id', user_id);
				}}
			>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					{#each data.tracks ?? [] as track (track.id)}
						<button
							class="btn disabled:opacity-100"
							class:variant-filled-primary={form?.correct !== track.id && form?.false !== track.id}
							class:variant-filled-success={form?.correct === track.id}
							class:variant-filled-error={form?.false === track.id}
							type="submit"
							name="track"
							value={track.id}
							disabled={!!form}
						>
							<span class="text-sm break-words whitespace-normal">{track.name}</span>
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
					<span class="text-center">You chose wrong!</span>
				{/if}
				<button class="btn variant-filled-primary w-fit" on:click={() => window.location.reload()}
					>Play again</button
				>
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
