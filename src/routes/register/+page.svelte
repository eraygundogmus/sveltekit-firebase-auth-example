<script lang="ts">
	import { auth } from '$lib/firebase.client';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { session } from '$lib/session';

	let email: string = '';
	let password: string = '';

	async function handleRegister() {
		await createUserWithEmailAndPassword(auth, email, password)
			.then((result) => {
				const { user } = result;
				session.update((cur: any) => {
					return {
						...cur,
						user,
						loggedIn: true,
						loading: false
					};
				});
				goto('/');
			})
			.catch((error) => {
				throw new Error(error);
			});
	}
</script>

<div class="register-form">
	<form on:submit={handleRegister}>
		<h2>Register</h2>
		<input bind:value={email} type="text" placeholder="Email" />
		<input bind:value={password} type="password" placeholder="Password" />
		<button type="submit">Register</button>
	</form>
</div>

<style>
	.register-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		height: 100vh;
	}

	form {
		max-width: 300px;
		margin: 0 auto;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #f5f5f5;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	input[type='text'],
	input[type='password'] {
		width: 100%;
		padding: 10px 0;
		margin-bottom: 10px;
		border: 1px solid #ccc;
		border-radius: 3px;
	}

	button {
		display: block;
		width: 100%;
		padding: 10px;
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 3px;
		cursor: pointer;
	}
</style>
