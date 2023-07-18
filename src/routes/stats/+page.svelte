<script async script lang="ts">
	import {
		Alignments,
		BarChartGrouped,
		BarChartSimple,
		DonutChart,
		GaugeChart,
		LineChart,
		RadarChart,
		ScaleTypes
	} from '@carbon/charts-svelte';

	import '@carbon/charts-svelte/styles.css';
	import '@carbon/charts/styles.css';

	import {
		getGenreOrItemtypeQuestionsDonutChart,
		getGenreOrItemtypeScoresOverallAndHistoryRadarChart,
		getLevelGenreVerticalGroupedBarChart,
		getScoreGaugeChart,
		getScoresHistoryLineChart,
		lineChartTimeBaseScore,
		verticalSimpleBarDurationDay,
		verticalSimpleBarDurationIntraDay
	} from '../../lib/firebase/dashboardLoading';
	import { authStore } from '../../store/store';

	let user_id: string = '';

	authStore.subscribe((store: any) => {
		user_id = store.user.uid;
	});

	const barDataIntraDay = verticalSimpleBarDurationIntraDay(user_id);
	const barDataDay = verticalSimpleBarDurationDay(user_id);
	const lineDataScore = lineChartTimeBaseScore(user_id);
	const donutDataGenre = getGenreOrItemtypeQuestionsDonutChart(user_id, 'Genre');
	const donutDataItem = getGenreOrItemtypeQuestionsDonutChart(user_id, 'Itemtype');
	const radarDataGenre = getGenreOrItemtypeScoresOverallAndHistoryRadarChart(user_id, 'Genre');
	const radarDataItem = getGenreOrItemtypeScoresOverallAndHistoryRadarChart(user_id, 'Itemtype');
	const gaugeDataGenre = getScoreGaugeChart(user_id, 'History');
	const barDataGenre = getLevelGenreVerticalGroupedBarChart(user_id);
	const lineDataGenre = getScoresHistoryLineChart(user_id, 'Genre');
</script>

<div class="first-letter: flex justify-center items-center">
	<div class="w-full md:w-4/5 xl:w-2/3 m-12 h-4/5">
		<div class="carbon-graph grid grid-flow-row-dense grid-cols-2 xl:grid-cols-3 gap-4">
			<div class="card variant-soft-surface p-4 aspect-square h-full max-w-full col-span-1">
				{#await radarDataGenre}
					<p>Loading...</p>
				{:then data}
					<RadarChart
						{data}
						options={{
							title: 'Score by Genre',
							radar: {
								alignment: Alignments.CENTER,
								axes: {
									angle: 'feature', //dont change
									value: 'value' // dont change
								}
							},
							legend: {
								alignment: Alignments.CENTER
							},
							toolbar: {
								enabled: false
							}
						}}
					/>
				{/await}
			</div>
			<div class="card variant-soft-surface p-4 aspect-square h-full max-w-full col-span-1">
				{#await radarDataItem}
					<p>Loading...</p>
				{:then data}
					<RadarChart
						{data}
						options={{
							title: 'Score by Type',
							radar: {
								alignment: Alignments.CENTER,
								axes: {
									angle: 'feature', //dont change
									value: 'value' // dont change
								}
							},
							legend: {
								alignment: Alignments.CENTER
							},
							toolbar: {
								enabled: false
							}
						}}
					/>
				{/await}
			</div>
			<div class="card variant-soft-surface p-4 aspect-[2/1] col-span-2">
				{#await lineDataScore}
					<p>Loading...</p>
				{:then data}
					<LineChart
						{data}
						options={{
							title: 'Score History',
							axes: {
								bottom: {
									title: 'Time',
									mapsTo: 'date',
									scaleType: ScaleTypes.TIME
								},
								left: {
									mapsTo: 'value',
									title: 'Score',
									scaleType: ScaleTypes.LINEAR
								}
							},
							curve: 'curveMonotoneX',
							legend: {
								alignment: Alignments.CENTER
							},
							toolbar: {
								enabled: false
							}
						}}
					/>
				{/await}
			</div>
			<!-- <div class="card variant-soft-surface p-4 aspect-[2/1] col-span-2">
				{#await barDataIntraDay}
					<p>Loading...</p>
				{:then data}
					<BarChartSimple
						{data}
						options={{
							title: 'Time Spent intra Day',
							axes: {
								bottom: {
									title: 'Time',
									mapsTo: 'date',
									scaleType: ScaleTypes.TIME
								},
								left: {
									mapsTo: 'value',
									title: 'Score',
									scaleType: ScaleTypes.LINEAR
								}
							},
							legend: {
								alignment: Alignments.CENTER
							},
							toolbar: {
								enabled: false
							}
						}}
					/>
				{/await}
			</div> -->
			<div class="card variant-soft-surface p-4 aspect-square h-full max-w-full col-span-1">
				{#await donutDataGenre}
					<p>Loading...</p>
				{:then data}
					<DonutChart
						{data}
						options={{
							title: 'Questions by Genre',
							resizable: true,
							donut: {
								alignment: Alignments.CENTER,
								center: {
									label: 'Overall Questions'
								}
							},
							legend: {
								alignment: Alignments.CENTER
							},
							toolbar: {
								enabled: false
							}
						}}
					/>
				{/await}
			</div>
			<!-- <div class="card variant-soft-surface p-4 aspect-[2/1] col-span-2">
				{#await lineDataGenre}
					<p>Loading...</p>
				{:then data}
					<LineChart
						{data}
						options={{
							title: 'Score History',
							axes: {
								bottom: {
									title: 'Time',
									mapsTo: 'key',
									scaleType: ScaleTypes.LABELS
								},
								left: {
									mapsTo: 'value',
									title: 'Score',
									scaleType: ScaleTypes.LINEAR
								}
							},
							legend: {
								alignment: Alignments.CENTER
							},
							toolbar: {
								enabled: false
							}
						}}
					/>
				{/await}
			</div> -->

			<div class="card variant-soft-surface p-4 aspect-square h-full max-w-full col-span-1">
				{#await donutDataItem}
					<p>Loading...</p>
				{:then data}
					<DonutChart
						{data}
						options={{
							title: 'Questions by Type',
							resizable: true,
							donut: {
								alignment: Alignments.CENTER,
								center: {
									label: 'Overall Questions'
								}
							},
							legend: {
								alignment: Alignments.CENTER
							},
							toolbar: {
								enabled: false
							}
						}}
					/>
				{/await}
			</div>

			<div class="card variant-soft-surface p-4 aspect-square h-full max-w-full col-span-1">
				{#await gaugeDataGenre}
					<p>Loading...</p>
				{:then data}
					<GaugeChart
						{data}
						options={{
							title: 'Score Average Trend',
							resizable: true,
							gauge: {
								type: 'semi', //GaugeTypes.SEMI,
								status: 'danger' // Statuses.DANGER
							},
							legend: {
								alignment: Alignments.CENTER
							},
							toolbar: {
								enabled: false
							}
						}}
					/>
				{/await}
			</div>

			<div class="card variant-soft-surface p-4 aspect-[2/1] col-span-2">
				{#await barDataDay}
					<p>Loading...</p>
				{:then data}
					<BarChartSimple
						{data}
						options={{
							title: 'Time spent per day',
							axes: {
								bottom: {
									title: 'Time',
									mapsTo: 'date',
									scaleType: ScaleTypes.TIME
								},
								left: {
									mapsTo: 'value',
									title: 'Score',
									scaleType: ScaleTypes.LINEAR
								}
							},
							legend: {
								alignment: Alignments.CENTER
							},
							toolbar: {
								enabled: false
							}
						}}
					/>
				{/await}
			</div>

			<div class="card variant-soft-surface p-4 aspect-[2/1] col-span-2">
				{#await barDataGenre}
					<p>Loading...</p>
				{:then data}
					<BarChartGrouped
						{data}
						options={{
							title: 'Score by Level and Genre',
							axes: {
								left: {
									mapsTo: 'value',
									title: 'Score'
								},
								bottom: {
									scaleType: ScaleTypes.LABELS,
									mapsTo: 'key',
									title: 'Genre'
								}
							},
							legend: {
								alignment: Alignments.CENTER
							},
							toolbar: {
								enabled: false
							}
						}}
					/>
				{/await}
			</div>
		</div>
	</div>
</div>
