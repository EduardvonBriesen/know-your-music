<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { confetti } from '@neoconfetti/svelte';
	import { enhance } from '$app/forms';
	import { authStore } from '../../../store/store';

	export let data;
	// export let form;

	let user_id = '';

	authStore.subscribe((store) => {
		user_id = store.user.uid;
	});
</script>

<div class="flex place-content-center">
	<div class="card p-4 w-2/3 variant-glass-surface space-4 m-10">
		<header class="card-header flex flex-col items-center">
			<span class="text-center">Continue the lyrics?</span>
			<div class="text-center, whitespace-pre">{data.verse}</div>
		</header>
		<section class="p-4" />
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
