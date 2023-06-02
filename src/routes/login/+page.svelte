<script>
	import { authHandler } from '../../store/store';

	let email = '';
	let password = '';
	let confirmPassword = '';

	let register = false;

	const submit = () => {
		console.log(email, password);

		if (register) {
			if (password !== confirmPassword) {
				alert('Passwords do not match');
				return;
			}
			authHandler.signup(email, password);
			return;
		}

		authHandler.login(email, password);
	};
</script>

<div class="flex place-content-center">
	<form
		class="flex w-60 flex-col items-center gap-1"
		on:submit={(e) => {
			e.preventDefault();
			submit();
		}}
	>
		<input
			bind:value={email}
			class="w-full rounded border border-gray-400 px-2"
			type="email"
			id="email"
			name="email"
			placeholder="Email"
		/>
		<input
			bind:value={password}
			class="w-full rounded border border-gray-400 px-2"
			type="password"
			id="password"
			name="password"
			placeholder="Password"
		/>
		{#if register}
			<input
				bind:value={confirmPassword}
				class="w-full rounded border border-gray-400 px-2"
				type="password"
				id="password"
				name="password"
				placeholder="Confirm Password"
			/>
		{/if}
		{#if register}
			<button class="w-1/2 rounded bg-purple-400 px-2" type="submit">Register</button>
			<p class="pt-6 text-xs">Already an account?</p>
			<button
				on:click={() => {
					register = !register;
				}}
				class="w-1/2 rounded bg-gray-400 px-2"
				>Login
			</button>
		{:else}
			<button class="w-1/2 rounded bg-purple-400 px-2" type="submit">Login</button>
			<p class="pt-6 text-xs">Don't have an account yet?</p>
			<button
				on:click={() => {
					register = !register;
				}}
				class="w-1/2 rounded bg-gray-400 px-2"
				>Register
			</button>
		{/if}
	</form>
</div>
