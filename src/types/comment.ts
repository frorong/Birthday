export interface CommentType {
  name: string;
  content: string;
  key: string;
}

export interface CommentResponseType extends CommentType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
