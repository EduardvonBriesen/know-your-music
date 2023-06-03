<script>
	import { authHandler } from '../store/store';

	const logout = () => {
		authHandler.logout();
	};
</script>

<header class="flex w-full justify-end">
	<div>
		<button on:click={logout} class="m-2 rounded bg-purple-400 px-2">Logout</button>
	</div>
</header>
