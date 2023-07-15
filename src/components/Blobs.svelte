<script lang="ts">
	import { onMount } from 'svelte';
	import { Noise } from 'noisejs';

	export let color;

	const amount = 8;
	const speed = 0.004;
	const frameTime = 100;
	const radius = [200, 400];
	const colorVariation = 20;

	const bounds = {
		top: 100,
		left: 100,
		width: 700,
		height: 700
	};

	const noise = new Noise(Math.random());
	let orbs: {
		x: number;
		y: number;
		xOff: number;
		yOff: number;
		r: number;
		color: string;
		hueShift: number;
	}[] = [];

	for (let i = 0; i < amount; i++) {
		orbs.push({
			x: Math.random() * bounds.width,
			y: Math.random() * bounds.height,
			xOff: Math.random() * 1000,
			yOff: Math.random() * 1000,
			r: Math.random() * (radius[1] - radius[0]) + radius[0],
			color: color,
			hueShift: Math.round((Math.random() - 0.5) * 4) * colorVariation
		});
	}

	function animate() {
		console.log('animate');
		orbs = orbs.map((orb) => {
			return {
				...orb,
				x: map(noise.simplex2(orb.xOff, orb.yOff), -1, 1, bounds.left, bounds.left + bounds.width),
				y: map(noise.simplex2(orb.yOff, orb.xOff), -1, 1, bounds.top, bounds.top + bounds.height),
				xOff: (orb.xOff + speed) % 10000,
				yOff: (orb.yOff + speed) % 10000,
				r: map(noise.simplex2(orb.xOff, orb.yOff), -1, 1, radius[0], radius[1])
			};
		});
		noise.seed(noise.seed());
		setTimeout(() => {
			animate();
		}, frameTime);
	}

	onMount(() => {
		animate();
	});

	// map a number from 1 range to another
	function map(n: number, start1: number, end1: number, start2: number, end2: number) {
		return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
	}
</script>

<div>
	{#each orbs as orb}
		<div
			class="absolute rounded-full -z-10"
			style="
      background-color: {orb.color};
      width: {orb.r}px;
      height: {orb.r}px;
      top: {orb.y + bounds.top}px;
      left: {orb.x + bounds.left}px;
      transform: translate(-50%, -50%);
      filter: hue-rotate({orb.hueShift}deg) blur(50px);
      opacity: 0.5;
    "
		/>
	{/each}
</div>
