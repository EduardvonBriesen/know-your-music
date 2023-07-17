<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { animateStore } from '../store/store';
	import { navigating } from '$app/stores';

	export let color = '#000';
	export let r = 100;
	export let x = 600;
	export let y = 600;
	export let hueShift = Math.round((Math.random() - 0.5) * 4) * 20;

	let coords = tweened(
		{ x, y, r },
		{
			duration: 5000,
			easing: cubicOut
		}
	);

	const animate = () => {
		coords.set({
			x: Math.random() * x + x / 2,
			y: Math.random() * y + y / 2,
			r: Math.random() * r + r / 2
		});
	};

	animateStore.subscribe((store) => {
		animate();
	});

	$: if ($navigating) animate();
</script>

<div
	class="absolute rounded-full -z-10"
	style="
      background-color: {color};
      width: {r}px;
      height: {r}px;
      top: {$coords.y}px;
      left: {$coords.x}px;
      transform: translate(-50%, -50%);
      filter: blur(50px) hue-rotate({hueShift}deg);
      opacity: 0.5;
    "
/>
