export interface CommentType {
  id: number;
  name: string;
  content: string;
  key: number;
}

export interface CommentResponseType extends CommentType {
  createdAt: Date;
  updatedAt: Date;
}
