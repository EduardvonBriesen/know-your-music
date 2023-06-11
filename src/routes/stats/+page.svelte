<script lang="ts">
	import { auth, db } from '$lib/firebase/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let stats = {
		score: 0,
		correct: 0,
		incorrect: 0
	};

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

<main>
	<h1>Stats</h1>
	<p>Score: {stats.score}</p>
	<p>correct: {stats.correct}</p>
	<p>incorrect: {stats.incorrect}</p>
</main>
