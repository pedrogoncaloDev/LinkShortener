export interface ShortenedLink {
  id: string;
  original_url: string;
  shortened_url: string;
  created_at: string;
  expired: boolean;
}

export interface ShortenLinkRequest {
  url: string;
}

export interface ShortenLinkResponse {
  shortened_url: string;
}
