
export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // base64 string for displaying in UI
}
