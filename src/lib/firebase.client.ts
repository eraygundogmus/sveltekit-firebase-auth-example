import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { browser } from '$app/environment';

export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	useEmulator: import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'true',
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
};

export const initializeFirebase = () => {
	if (!browser) {
		throw new Error("Can't use the Firebase client on the server.");
	}
	if (!app) {
		app = initializeApp(firebaseConfig);
		auth = getAuth(app);

		if (firebaseConfig.useEmulator) {
			connectAuthEmulator(auth, 'http://127.0.0.1:9099');
		}
	}
};

export const authErrorMessages = {
	'auth/admin-restricted-operation': 'This operation is restricted to administrators.',
	'auth/argument-error': 'Invalid arguments provided.',
	'auth/app-not-authorized': 'This app is not authorized to use Firebase.',
	'auth/app-not-installed': 'This app is not installed on your device.',
	'auth/captcha-check-failed': 'Google reCAPTCHA check failed.',
	'auth/code-expired': 'The provided code has expired.',
	'auth/cordova-not-ready': 'Cordova is not ready.',
	'auth/cors-unsupported': 'CORS is not supported by your browser.',
	'auth/credential-already-in-use': 'This credential is already associated with another account.',
	'auth/custom-token-mismatch': 'The custom token and API key do not match.',
	'auth/requires-recent-login': 'Please login again, as your last login was too long ago.',
	'auth/dependent-sdk-initialized-before-auth':
		'Please initialize the Firebase Auth SDK before other dependent SDKs.',
	'auth/dynamic-link-not-activated': 'Dynamic links are not activated.',
	'auth/email-change-needs-verification': 'Please verify your new email address.',
	'auth/email-already-in-use': 'The email address is already in use.',
	'auth/emulator-config-failed': 'Emulator configuration failed.',
	'auth/expired-action-code': 'The action code has expired.',
	'auth/cancelled-popup-request': 'The popup request has been cancelled.',
	'auth/internal-error': 'An internal error has occurred.',
	'auth/invalid-api-key': 'The provided API key is invalid.',
	'auth/invalid-app-credential': 'The app credential is invalid.',
	'auth/invalid-app-id': 'The app ID is invalid.',
	'auth/invalid-user-token': 'Invalid user token.',
	'auth/invalid-auth-event': 'Invalid authentication event.',
	'auth/invalid-cert-hash': 'Invalid certificate hash.',
	'auth/invalid-verification-code': 'The provided verification code is invalid.',
	'auth/invalid-continue-uri': 'The continue URL is invalid.',
	'auth/invalid-cordova-configuration': 'Invalid Cordova configuration.',
	'auth/invalid-custom-token': 'The custom token is invalid.',
	'auth/invalid-dynamic-link-domain': 'The dynamic link domain is invalid.',
	'auth/invalid-email': 'Invalid email address.',
	'auth/invalid-emulator-scheme': 'Invalid emulator scheme.',
	'auth/invalid-credential': 'Invalid Identity Provider response.',
	'auth/invalid-message-payload': 'Invalid message payload.',
	'auth/invalid-multi-factor-session': 'Invalid multi-factor authentication session.',
	'auth/invalid-oauth-client-id': 'Invalid OAuth client ID.',
	'auth/invalid-oauth-provider': 'Invalid OAuth provider.',
	'auth/invalid-action-code': 'The reset password action code is invalid.',
	'auth/unauthorized-domain': 'Unauthorized domain.',
	'auth/wrong-password': 'Incorrect password.',
	'auth/invalid-persistence-type': 'Invalid persistence type.',
	'auth/invalid-phone-number': 'Invalid phone number.',
	'auth/invalid-provider-id': 'Invalid provider ID.',
	'auth/invalid-recipient-email': 'Invalid recipient email.',
	'auth/invalid-sender': 'Invalid sender.',
	'auth/invalid-verification-id': 'Invalid verification ID.',
	'auth/invalid-tenant-id': 'Invalid tenant ID.',
	'auth/multi-factor-info-not-found': 'Multi-factor authentication information not found.',
	'auth/multi-factor-auth-required': 'Multi-factor authentication is required.',
	'auth/missing-android-pkg-name': 'Missing Android package name.',
	'auth/missing-app-credential': 'Missing app credential.',
	'auth/auth-domain-config-required': 'Missing authentication domain configuration.',
	'auth/missing-verification-code': 'Missing verification code.',
	'auth/missing-continue-uri': 'Missing continue URL.',
	'auth/missing-iframe-start': 'Missing iframe start.',
	'auth/missing-ios-bundle-id': 'Missing iOS bundle ID.',
	'auth/missing-or-invalid-nonce': 'Missing or invalid nonce.',
	'auth/missing-multi-factor-info': 'Missing multi-factor authentication information.',
	'auth/missing-multi-factor-session': 'Missing multi-factor authentication session.',
	'auth/missing-phone-number': 'Missing phone number.',
	'auth/missing-verification-id': 'Missing verification ID.',
	'auth/app-deleted': 'The authentication module has been deleted.',
	'auth/account-exists-with-different-credential':
		'An account with this email already exists with a different credential.',
	'auth/network-request-failed': 'A network request has failed.',
	'auth/null-user': 'No user is currently signed in.',
	'auth/no-auth-event': 'No authentication event.',
	'auth/no-such-provider': 'No such Identity Provider.',
	'auth/operation-not-allowed': 'This operation is not allowed.',
	'auth/operation-not-supported-in-this-environment':
		'This operation is not supported in your current environment.',
	'auth/popup-blocked': 'Popup blocked by the browser.',
	'auth/popup-closed-by-user': 'Popup closed by user.',
	'auth/provider-already-linked': 'This provider is already linked to your account.',
	'auth/quota-exceeded': 'Quota exceeded.',
	'auth/redirect-cancelled-by-user': 'Redirect cancelled by user.',
	'auth/redirect-operation-pending': 'Redirect operation is pending.',
	'auth/rejected-credential': 'Rejected credential.',
	'auth/second-factor-already-in-use': 'Second factor authentication method already in use.',
	'auth/maximum-second-factor-count-exceeded': 'Maximum number of second factor methods exceeded.',
	'auth/tenant-id-mismatch': 'Tenant ID mismatch.',
	'auth/timeout': 'A timeout has occurred.',
	'auth/user-token-expired': 'User token has expired.',
	'auth/too-many-requests': 'Too many attempts. Please try again later.',
	'auth/unauthorized-continue-uri': 'Unauthorized continue URL.',
	'auth/unsupported-first-factor': 'Unsupported first factor authentication method.',
	'auth/unsupported-persistence-type': 'Unsupported persistence type.',
	'auth/unsupported-tenant-operation': 'Unsupported tenant operation.',
	'auth/unverified-email': 'Unverified email address.',
	'auth/user-cancelled': 'User cancelled authentication.',
	'auth/user-not-found': 'User not found.',
	'auth/user-disabled': 'User account is disabled.',
	'auth/user-mismatch': 'User mismatch.',
	'auth/user-signed-out': 'User has signed out.',
	'auth/weak-password': 'The password is weak.',
	'auth/web-storage-unsupported': 'Web storage is unsupported by your browser.',
	'auth/already-initialized': 'Firebase Auth has already been initialized.',
	'auth/recaptcha-not-enabled': 'Google reCAPTCHA is not enabled.',
	'auth/missing-recaptcha-token': 'Missing Google reCAPTCHA token.',
	'auth/invalid-recaptcha-token': 'Invalid Google reCAPTCHA token.',
	'auth/invalid-recaptcha-action': 'Invalid Google reCAPTCHA action.',
	'auth/missing-client-type': 'Missing client type.',
	'auth/missing-recaptcha-version': 'Missing Google reCAPTCHA version.',
	'auth/invalid-recaptcha-version': 'Invalid Google reCAPTCHA version.',
	'auth/invalid-req-type': 'Invalid request type.'
};
