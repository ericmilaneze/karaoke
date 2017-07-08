export interface ProviderData {
	displayName: string;
	email: string;
	photoURL: string;
	providerId: string;
	uid: string;
}

export interface StsTokenManager {
	accessToken: string;
	apiKey: string;
	expirationTime: number;
	refreshToken: string;
}

export interface User {
	apiKey: string;
	appName: string;
	authDomain: string;
	displayName: string;
	email: string;
	emailVerified: boolean;
	isAnonymous: boolean;
	photoURL: string;
	providerData: ProviderData[];
	stsTokenManager: StsTokenManager;
	uid: string;
}
