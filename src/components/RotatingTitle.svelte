<script lang="ts">
	export let preTitle: string;
	export let rotatingWords: string[];
	export let description: string;

	const colorClasses = [
		'text-secondary-500',
		'text-error-500',
		'text-tertiary-500',
		'text-success-500',
		'text-secondary-500'
	];
</script>

<section class="text-center">
	<div
		class="box-content flex text-5xl sm:text-7xl 2xl:text-8xl font-bold justify-center mt-16 mb-6 h-14 sm:h-20 2xl:h-28"
	>
		<p>{preTitle}</p>
		<div class="box-border overflow-hidden">
			{#each rotatingWords as world, i}
				<span
					class="spin-words block pl-4 text-left h-full {colorClasses[i % colorClasses.length]}  "
					>{world}</span
				>
			{/each}
		</div>
	</div>
	<div class="flex justify-center">
		<p class="h4 max-w-xl mx-8">{description}</p>
	</div>
</section>

<style>
	.spin-words {
		animation: spin_words 6s infinite;
	}
	@keyframes spin_words {
		10% {
			transform: translateY(-105%);
		}
		25% {
			transform: translateY(-100%);
		}
		35% {
			transform: translateY(-205%);
		}
		50% {
			transform: translateY(-200%);
		}
		60% {
			transform: translateY(-305%);
		}
		75% {
			transform: translateY(-300%);
		}
		85% {
			transform: translateY(-405%);
		}
		100% {
			transform: translateY(-400%);
		}
	}
</style>
