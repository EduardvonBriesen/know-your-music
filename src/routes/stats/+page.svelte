<script async script lang="ts">
	import { BarChartGrouped, DonutChart, GaugeChart, LineChart, RadarChart } from '@carbon/charts-svelte';
	import '@carbon/styles/css/styles.css'; // may affect global styles
	import '@carbon/charts-svelte/styles.css';
	import type { UserData, Genre } from '../../lib/firebase/dataBase.types';
	import { initDataStructure } from '../../lib/firebase/initDemoUser1';
	import {
		getGenreOrItemtypeQuestionsDonutChart,
		getLevelGenreVerticalGroupedBarChart,
		getScoreGaugeChart,
		getScoresHistoryLineChart
	} from '../../lib/firebase/dashboardLoading';
	import { authStore } from '../../store/store';

	let user_id: string = '';

	authStore.subscribe((store: any) => {
		user_id = store.user.uid;
	});

	const donutDataGenre = getGenreOrItemtypeQuestionsDonutChart(user_id, 'Genre');
	const radarDataGenre = getGenreOrItemtypeQuestionsDonutChart(user_id, 'Genre');
	const gaugeDataGenre = getScoreGaugeChart(user_id, 'History');
	const barDataGenre = getLevelGenreVerticalGroupedBarChart(user_id);
	const lineDataGenre = getScoresHistoryLineChart(user_id, 'Genre');
</script>

<div class="flex justify-center items-center">
	<div class="w-3/4 md:w-4/5 xl:w-2/3 m-12 h-4/5">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div class="card variant-soft-surface p-4">
				{#await donutDataGenre}
					<p>Loading...</p>
				{:then data}
					<DonutChart data={data.data} options={data.options} />
				{/await}
			</div>
			<div
				class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-square"
			>
				{#await radarDataGenre}
					<p>Loading...</p>
				{:then data}
					<RadarChart data={data.data} options={data.options} />
				{/await}
			</div>
			<div
				class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-square"
			>
				{#await gaugeDataGenre}
					<p>Loading...</p>
				{:then data}
					<GaugeChart data={data.data} options={data.options} />
				{/await}
			</div>
		</div>
		<div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 h-1/2">
			<div
				class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-video"
			>
				{#await lineDataGenre}
					<p>Loading...</p>
				{:then data}
					<LineChart data={data.data} options={data.options} />
				{/await}
			</div>
			<div
				class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-video"
			>
				{#await barDataGenre}
					<p>Loading...</p>
				{:then data}
					<BarChartGrouped data={data.data} options={data.options} />
				{/await}
			</div>
		</div>
	</div>
</div>
