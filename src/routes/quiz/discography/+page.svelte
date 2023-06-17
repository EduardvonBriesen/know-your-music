<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data;

	let items = [
		{ id: 1, name: 'item1', image: '' },
		{ id: 2, name: 'item2', image: '' },
		{ id: 3, name: 'item3', image: '' },
		{ id: 4, name: 'item4', image: '' }
	];
	const flipDurationMs = 300;

	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
	}

	$: {
		if (data.albums) {
			items = data.albums.map((album, index) => {
				return { id: index, name: album.name, image: album.image };
			});
		}
	}
</script>

<div class="flex place-content-center">
	<div class="card w-2/3 text-token space-4 m-10">
		<header class="card-header flex flex-col items-center">
			<Avatar
				rounded="rounded-xl"
				width="w-1/3"
				cursor="cursor-pointer"
				src={data.artist?.image}
				alt={data.artist?.name}
			/>
			<h3 class="h3">{data.artist?.name}</h3>
			<span class="text-center">In what order were these albums released?</span>
		</header>
		<section
			class="flex flex-row justify-evenly gap-4 p-4"
			use:dndzone={{ items, flipDurationMs }}
			on:consider={handleDndConsider}
			on:finalize={handleDndFinalize}
		>
			{#each items as item (item.id)}
				<div class="flex flex-col items-center" animate:flip={{ duration: flipDurationMs }}>
					<Avatar
						class="w-auto aspect-square"
						rounded="rounded-xl"
						cursor="cursor-pointer"
						src={item.image}
						alt={item.name}
					/>
					<p class="text-center line-clamp-2">{item.name}</p>
				</div>
			{/each}
		</section>
	</div>
</div>
