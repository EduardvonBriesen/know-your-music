<script lang="ts">
	import { Avatar, ProgressBar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store';
	import { afterUpdate } from 'svelte/internal';
	import { confetti } from '@neoconfetti/svelte';

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
				{#if data.sections[0]}
					<span class="text-center">{data.sections[0]}</span>
					<br />
				{/if}
				{#each data.revealedLines as line, i}
					<span
						class:text-primary-500={form?.progress.get(i)}
						class:text-error-500={form?.progress.get(i) === false}
						class="text-center">{line}</span
					>
					{#if data.sections[i + 1]}
						<br />
						<span class="text-center">{data.sections[i + 1]}</span>
						<br />
					{/if}
				{/each}
			</div>
		</section>
		<footer class="card-footer flex flex-col items-center">
			{#if !form || form?.finished === false}
				<ProgressBar class="my-8" value={data.revealedLines.length} max={data.totalLines} />
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
				<ProgressBar
					class="mt-8"
					meter="variant-filled-success"
					track="variant-filled-error"
					value={form.score}
				/>
				<p class="m-4">
					You got <span
						class:text-success-500={form.score && form.score >= 50}
						class:text-error-500={form.score && form.score < 50}>{form.score}</span
					>% right!
				</p>
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
	</div>
	{#if form?.score && form?.score >= 50 && form?.finished !== null && form?.finished}
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
