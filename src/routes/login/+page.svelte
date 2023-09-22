<script lang="ts">
	import { session } from '$lib/session';
	import { auth } from '$lib/firebase.client';
	import {
		GoogleAuthProvider,
		signInWithPopup,
		signInWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';
	import { goto } from '$app/navigation';

	let email: string = '';
	let password: string = '';

	async function loginWithMail() {
		await signInWithEmailAndPassword(auth, email, password)
			.then((result) => {
				const { user }: UserCredential = result;
				session.set({
					loggedIn: true,
					user: {
						displayName: user?.displayName,
						email: user?.email,
						photoURL: user?.photoURL,
						uid: user?.uid
					}
				});
				goto('/');
			})
			.catch((error) => {
				return error;
			});
	}

	async function loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider)
			.then((result) => {
				const { displayName, email, photoURL, uid } = result?.user;
				session.set({
					loggedIn: true,
					user: {
						displayName,
						email,
						photoURL,
						uid
					}
				});

				goto('/');
			})
			.catch((error) => {
				return error;
			});
	}
</script>

<div class="login-form">
	<h1>Login</h1>
	<form on:submit={loginWithMail}>
		<input bind:value={email} type="text" placeholder="Email" />
		<input bind:value={password} type="password" placeholder="Password" />
		<button type="submit">Login</button>
	</form>

	<div>or</div>

	<button on:click={loginWithGoogle}>Login with Google</button>
	<div>Don't you have an account? <a href="/register"> Register</a></div>
</div>

<style>
	.login-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
		height: 100vh;
	}

	form {
		width: 300px;
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

	div button {
		display: block;
		width: 300px;
		padding: 10px;
		background-color: #4285f4;
		color: #fff;
		border: none;
		border-radius: 3px;
		cursor: pointer;
	}
</style>
