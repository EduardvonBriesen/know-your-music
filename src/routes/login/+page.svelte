<script>
	import { authHandler } from '../../store/store';

	let email = '';
	let password = '';
	let confirmPassword = '';

	let loading = false;

	let register = false;

	// TODO: Move to server side?
	const submit = () => {
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
		<div class="card p-6 w-1/2 text-token space-4 m-10">Logging in...</div>
	</div>
{:else}
	<div class="flex place-content-center">
		<form
			class="card p-6 w-1/2 text-token space-4 m-12"
			on:submit={(e) => {
				e.preventDefault();
				submit();
			}}
		>
			<div>
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
			</div>
			<div class="mt-3">
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
			</div>
			<div class="mt-3">
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
			</div>
			<footer class="card-footer p-0 mt-6 flex place-content-end gap-2">
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
