<script lang="ts">
	import { LineChart } from '@carbon/charts-svelte'
  	import '@carbon/styles/css/styles.css' // may affect global styles
  	import '@carbon/charts-svelte/styles.css'
	import type {UserData,Genre} from '../../lib/firebase/dataBase.types';
	import {initDataStructure} from '../../lib/firebase/initDemoUser1'; 
	import {getScoresHistoryLineChart} from '../../lib/firebase/dashboardLoading';	

	const data = getScoresHistoryLineChart("initDemoUser1", "Genre");
	
</script>

<div class="flex justify-center items-center">
	<div class="w-3/4 md:w-4/5 xl:w-2/3 m-12 h-4/5">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-square">
				<p>Chart 1</p>

			</div>
			<div class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-square">
				<p>Chart 2</p>
			</div>
			<div class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-square">
				<p>Chart 3</p>
			</div>
		</div>
		<div class="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 h-1/2">
			<div class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-video">
				<p>Chart 4</p>
			</div>
			<div class="card variant-soft-surface p-4 text-token space-4 flex place-content-center aspect-video">
				<p>Chart 5</p>
			</div>
		</div>
	</div>
</div>


