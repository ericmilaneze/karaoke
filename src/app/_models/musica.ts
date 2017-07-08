import { FBItem } from './fb-item';
import { User } from './user';

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
