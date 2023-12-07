export interface CommentType {
  name: string;
  content: string;
  key: number;
}

export interface CommentResponseType extends CommentType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
