<script>
	import { authHandler } from '../../store/store';
	import { fade } from 'svelte/transition';

	let email = '';
	let password = '';
	let confirmPassword = '';

	let loading = false;

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

		loading = true;
		authHandler.login(email, password);
	};
</script>

{#if loading}
	<div class="flex place-content-center">
		<div class="card p-4 w-1/2 text-token space-4 m-10">Logging in...</div>
	</div>
{:else}
	<div class="flex place-content-center">
		<form
			class="card p-4 w-1/2 text-token space-4 m-10"
			on:submit={(e) => {
				e.preventDefault();
				submit();
			}}
		>
			<lable class="label" for="email">
				<span>Email</span>
				<input
					bind:value={email}
					class="input"
					type="email"
					id="email"
					name="email"
					placeholder="Email"
				/></lable
			>
			<lable class="label" for="password">
				<span>Password</span>
				<input
					bind:value={password}
					class="input"
					type="password"
					id="password"
					name="password"
					placeholder="Password"
				/>
			</lable>
			{#if register}
				<lable class="label" for="password">
					<span>Confirm Password</span>
					<input
						bind:value={confirmPassword}
						class="input"
						type="password"
						id="password"
						name="password"
						placeholder="Confirm Password"
					/>
				</lable>
			{/if}
			<footer class="card-footer p-0 pt-4 flex place-content-end gap-2">
				<button class="btn btn-sm variant-filled-secondary" type="submit"
					>{#if register}
						Register
					{:else}
						Login
					{/if}
				</button>

				<button
					type="button"
					on:click={() => {
						register = !register;
					}}
					class="btn btn-sm variant-ghost"
				>
					{#if register}
						Login
					{:else}
						Register
					{/if}
				</button>
			</footer>
		</form>
	</div>
{/if}
