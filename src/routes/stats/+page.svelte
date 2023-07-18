<script async script lang="ts">
	import {
		Alignments,
		BarChartGrouped,
		DonutChart,
		GaugeChart,
		LineChart,
		RadarChart,
		ScaleTypes
	} from '@carbon/charts-svelte';
	
	import '@carbon/styles/css/styles.css'; // may affect global styles
	import '@carbon/charts-svelte/styles.css';

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
					<DonutChart
						{data}
						options={{
							title: 'Blub',
							resizable: true,
							donut: {
								alignment: Alignments.CENTER,
								center: {
									label: 'Overall Questions'
								}
							}
						}}
					/>
				{/await}
			</div>
			<div
				class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-square"
			>
				{#await radarDataGenre}
					<p>Loading...</p>
				{:then data}
					<RadarChart
						{data}
						options={{
							title: 'Genre Scores - Alltime vs. short-term History',
							radar: {
								axes: {
									angle: 'feature', //dont change
									value: 'value' // dont change
								}
							}
						}}
					/>
				{/await}
			</div>
			<div
				class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-square"
			>
				{#await gaugeDataGenre}
					<p>Loading...</p>
				{:then data}
					<GaugeChart
						{data}
						options={{
							title: 'Gauge semicircular -- danger status',
							resizable: true,
							gauge: {
								type: 'semi', //GaugeTypes.SEMI,
								status: 'danger' // Statuses.DANGER
							}
							//"theme": "g10"
						}}
					/>
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
					<LineChart
						{data}
						options={{
							title: 'Line (discrete)',
							axes: {
								bottom: {
									title: '2019 Annual Sales Figures',
									mapsTo: 'key',
									scaleType: ScaleTypes.LABELS
								},
								left: {
									mapsTo: 'value',
									title: 'Conversion rate',
									scaleType: ScaleTypes.LINEAR
								}
							}
							// "height": "400px",
							//"theme": "g100"
						}}
					/>
				{/await}
			</div>
			<div
				class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-video"
			>
				{#await barDataGenre}
					<p>Loading...</p>
				{:then data}
					<BarChartGrouped
						{data}
						options={{
							title: 'Vertical grouped bar (discrete)',
							axes: {
								left: {
									mapsTo: 'value'
								},
								bottom: {
									scaleType: ScaleTypes.LABELS,
									mapsTo: 'key'
								}
							}
							//"theme": "g100"
						}}
					/>
				{/await}
			</div>
		</div>
	</div>
</div>
