export interface GetTweetResponse {
  data: Tweet;
}

export interface Tweet {
  id: string;
  text: string;
  author_id?: string;
  created_at?: string;
  public_metrics?: PublicMetrics;
  referenced_tweets?: ReferencedTweet[];
}

interface PublicMetrics {
  impression_count?: number;
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count?: number;
}

interface ReferencedTweet {
  type: string;
  id: string;
}

export interface GetProfileResponse {
  data: Profile;
}

export interface Profile {
  id: string;
  username: string;
  name: string;
  profile_image_url?: string;
}

export interface Media {
  type: string;
  url?: string;
  preview_image_url?: string;
  media_key: string;
}
