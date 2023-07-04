<script lang="ts">
	import { Avatar, ProgressBar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store';
	import { afterUpdate } from 'svelte/internal';

	export let data;
	export let form;

	let user_id = '';
	let element: any;

	authStore.subscribe((store) => {
		user_id = store.user.uid;
	});

	const scrollToBottom = async (node: any) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	afterUpdate(() => {
		scrollToBottom(element);
	});
</script>

<div class="flex place-content-center">
	<div class="card p-4 w-2/3 variant-glass-surface space-4 m-10">
		<header class="card-header flex flex-col items-center">
			<Avatar
				rounded="rounded-xl"
				width="w-1/3"
				cursor="cursor-pointer"
				src={data.albumArt}
				alt={data.title}
			/>
			<h3 class="h3">{data.title}</h3>
			<span class="text-center">Continue the lyrics...</span>
		</header>
		<section class="p-4">
			<div class="flex flex-col items-center overflow-y-auto max-h-64" bind:this={element}>
				{#each data.revealedLines as line, i}
					<span
						class:text-primary-500={form?.progress.get(i)}
						class:text-error-500={form?.progress.get(i) === false}
						class="text-center">{line}</span
					>
				{/each}
			</div>
		</section>
		<footer class="card-footer flex flex-col items-center">
			<ProgressBar
				class="my-8"
				label="Progress Bar"
				value={data.revealedLines.length}
				max={data.totalLines}
			/>
			{#if !form || form?.finished === false}
				<form
					action="?/guess"
					method="POST"
					use:enhance={({ formData }) => {
						formData.set('user_id', user_id);
					}}
				>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
						{#each data.guessOptions as option}
							<button
								class="btn disabled:opacity-100 variant-filled-primary whitespace-pre-wrap"
								value={option}
								type="submit"
								name="answer">{option}</button
							>
						{/each}
					</div>
				</form>
			{:else}
				<form
					action="?/finish"
					method="POST"
					use:enhance={({ formData }) => {
						formData.set('user_id', user_id);
					}}
				>
					<button
						class="btn disabled:opacity-100 variant-filled-primary whitespace-pre-wrap"
						type="submit">Try Again</button
					>
				</form>
			{/if}
		</footer>
		<!-- {#if !!form}
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
		{/if} -->
	</div>
</div>
