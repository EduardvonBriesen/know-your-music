<script>
	import { authHandler } from '../store/store';
	import { AppBar } from '@skeletonlabs/skeleton';

	const logout = () => {
		authHandler.logout();
	};
</script>

<AppBar>
	<svelte:fragment slot="lead">know your music.</svelte:fragment>

	<svelte:fragment slot="trail">
		<button on:click={logout} class="btn btn-sm variant-ghost"> Logout </button>
	</svelte:fragment>
</AppBar>
