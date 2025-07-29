export interface Document {
  id: string;
  name: string;
  contributors: string[];
  version: number;
  attachments: string[];
  createdAt: string;
}