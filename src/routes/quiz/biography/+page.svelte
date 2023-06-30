<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;
	export let form;

	let user_id = '';
	let guess = '';

	authStore.subscribe((store: any) => {
		user_id = store.user.uid;
	});
</script>

<div class="flex place-content-center">
	<div class="card p-4 w-2/3 text-token space-4 m-10">
		<header class="card-header flex flex-col items-center">
			{#if !form}
				<h3 class="h3">Who hides behind this Bio?</h3>
			{:else}
				{#if form?.image}
					<Avatar
						rounded="rounded-xl"
						width="w-1/3"
						cursor="cursor-pointer"
						src={form?.image}
						alt={form?.artist}
					/>
				{/if}
				<h3 class="h3">{form?.artist}</h3>
			{/if}
		</header>
		<form
			method="POST"
			use:enhance={({ formData }) => {
				formData.set('user_id', user_id);
			}}
		>
			<section class="p-4">
				<p class="text-justify">
					{#if !form}
						{@html data.artist?.summary}
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
			<footer class="card-footer flex flex-col items-center">
				{#if data.artist?.summary.split('<input').length === 1}
					<input bind:value={guess} class="input px-2 w-48 m-2" name="answer" disabled={!!form} />
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
