<script lang="ts">
	import { auth, db } from '$lib/firebase/firebase';
	import { type ConicStop, ConicGradient } from '@skeletonlabs/skeleton';
	import { doc, getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

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
			{ label: 'Correct', color: 'rgb(var(--color-success-500))', start: 0, end: Math.round(winRate * 100 *100)/100},
			{ label: 'Incorrect', color: 'rgb(var(--color-error-500))', start: Math.round(winRate * 100 * 100)/100, end: 100 }
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
</script>

<div class="flex place-content-center">
	<div class="card p-4 w-2/3 text-token space-4 m-12 flex place-content-center">
		<div class="p-6 m-0 w-min">
			<ConicGradient class="h3" width="w-48" stops={conicStops} legend>Your Answers</ConicGradient>
		</div>
	</div>
</div>
