<script>
	import { authHandler } from '../store/store';
	import { AppBar } from '@skeletonlabs/skeleton';

	const logout = () => {
		authHandler.logout();
	};
</script>

<AppBar>
	<svelte:fragment slot="lead">know your music.</svelte:fragment>
	<nav>
		<a class="btn variant-soft" href="/quiz">Quiz</a>
		<a class="btn variant-soft" href="/stats">Stats</a>
	</nav>
	<svelte:fragment slot="trail">
		<button on:click={logout} class="btn variant-ghost"> Logout </button>
	</svelte:fragment>
</AppBar>
