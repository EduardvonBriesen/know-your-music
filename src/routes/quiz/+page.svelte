<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	import { confetti } from '@neoconfetti/svelte';

	export let data;
	export let form;
</script>

<div class="flex place-content-center">
	<form class="card p-4 w-1/2 text-token space-4 m-10">
		<header class="card-header flex flex-col items-center">
			<Avatar
				rounded="rounded-xl"
				width="w-1/2"
				cursor="cursor-pointer"
				src={data.artist?.image}
				alt={data.artist?.name}
			/>
			<h3 class="h3">{data.artist?.name}</h3>
			<span class="text-center">Which of the following tracks is most popular?</span>
		</header>
		<section class="p-4">
			<form method="POST" class="grid grid-cols-1 gap-4 md:grid-cols-3">
				{#each data.tracks as track (track.id)}
					<button class="btn variant-filled-secondary" type="submit" name="track" value={track.id}>
						<span class="text-sm break-words whitespace-normal">{track.name}</span>
					</button>
				{/each}
			</form>
			{#if form?.success}
				<div
					style="position: absolute; left: 50%; top: 30%"
					use:confetti={{
						force: 0.7,
						stageWidth: window.innerWidth,
						stageHeight: window.innerHeight
					}}
				/>
			{/if}
		</section>
	</form>
</div>
