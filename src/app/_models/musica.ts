import { FBItem } from './fb-item';

export interface Musica extends FBItem {
	added: boolean;
	etag: string;
	id: Id;
	kind: string;
	played: boolean;
	snippet: Snippet;
	user: User;
  tocada: boolean;
  erro: boolean;
  prioridade: boolean;
  prioridadeId: string;
  atual: boolean;
  primeiraVez: boolean;
}

export interface Id {
	kind: string;
	videoId: string;
}

export interface Default {
	height: number;
	url: string;
	width: number;
}

export interface High {
	height: number;
	url: string;
	width: number;
}

export interface Medium {
	height: number;
	url: string;
	width: number;
}

export interface Thumbnail {
	default: Default;
	high: High;
	medium: Medium;
}

export interface Snippet {
	channelId: string;
	channelTitle: string;
	description: string;
	liveBroadcastContent: string;
	publishedAt: string;
	thumbnails: Thumbnail;
	title: string;
}

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

