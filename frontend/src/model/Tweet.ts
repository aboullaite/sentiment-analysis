export interface Tweet {
  id: string;
  createdAt: Date;
  originalText: string;
  text: string;
  userName: string;
  screenName: string;
  profileImageUrl: string;
  sentimentType: number;
}
