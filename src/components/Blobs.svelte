<script lang="ts">
	import Blob from './Blob.svelte';

	export let color;

	const amount = 8;
	const colorVariation = 20;

	let orbs: {
		x: number;
		y: number;
		r: number;
		color: string;
		hueShift: number;
	}[] = [];

	for (let i = 0; i < amount; i++) {
		orbs.push({
			x: 500,
			y: 500,
			r: 200,
			color: color,
			hueShift: Math.round((Math.random() - 0.5) * 4) * colorVariation
		});
	}
</script>

<div>
	{#each orbs as orb}
		<Blob color={orb.color} r={orb.r} x={orb.x} y={orb.y} hueShift={orb.hueShift} />
	{/each}
</div>
