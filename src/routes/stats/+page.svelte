<script lang="ts">
	import { auth, db } from '$lib/firebase/firebase';
	import { type ConicStop, ConicGradient } from '@skeletonlabs/skeleton';
	import { doc, getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	import { LineChart } from '@carbon/charts-svelte';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts-svelte/styles.css';

	let stats = {
		correct: 1,
		incorrect: 1
	};

	let conicStops: ConicStop[] = [
		{ label: 'Correct', color: 'rgb(var(--color-success-500))', start: 0, end: 50 },
		{ label: 'Incorrect', color: 'rgb(var(--color-error-500))', start: 50, end: 100 }
	];

	$: {
		const winRate = stats.correct / (stats.correct + stats.incorrect);

		conicStops = [
			{ label: 'Correct', color: 'rgb(var(--color-success-500))', start: 0, end: winRate * 100 },
			{ label: 'Incorrect', color: 'rgb(var(--color-error-500))', start: winRate * 100, end: 100 }
		];
	}

	onMount(() => {
		auth.onAuthStateChanged(async (user) => {
			if (!user) return;
			const userRef = doc(db, 'users', user.uid);
			const userDoc = await getDoc(userRef);
			if (!userDoc.exists()) return;
			stats = userDoc.data().stats;
		});
	});

	let options = {
		title: 'Bubble (linear)',
		axes: {
			bottom: {
				title: 'No. of employees',
				mapsTo: 'sales',
				includeZero: false
			},
			left: {
				title: 'Annual sales',
				mapsTo: 'profit',
				includeZero: false
			}
		},
		bubble: {
			radiusMapsTo: 'surplus'
		}
	};

	let data = [
		{ group: 'Dataset 1', sales: 10000, profit: 32100, surplus: 50000 },
		{ group: 'Dataset 1', sales: 12000, profit: 23500, surplus: 34000 },
		{ group: 'Dataset 1', sales: 14000, profit: 53100, surplus: 63000 },
		{ group: 'Dataset 1', sales: 15000, profit: 42300, surplus: 43000 },
		{ group: 'Dataset 1', sales: 16000, profit: 12300, surplus: 55000 },
		{ group: 'Dataset 2', sales: 11000, profit: 12400, surplus: 25000 },
		{ group: 'Dataset 2', sales: 13000, profit: 34500, surplus: 35000 },
		{ group: 'Dataset 2', sales: 13500, profit: 23100, surplus: 55000 },
		{ group: 'Dataset 2', sales: 15500, profit: 63200, surplus: 35000 },
		{ group: 'Dataset 2', sales: 15750, profit: 24300, surplus: 64000 }
	];
</script>

<LineChart {data} {options} />
<div class="flex place-content-center">
	<div class="card p-4 w-2/3 text-token space-4 m-10">
		<ConicGradient width="w-48" stops={conicStops} legend>Your Scores</ConicGradient>
	</div>
</div>
