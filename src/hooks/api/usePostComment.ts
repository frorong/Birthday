import { useMutation } from '@tanstack/react-query';

import { commentQueryKeys, commentUrl, post } from '@/libs';
import type { CommentResponseType, CommentType } from '@/types';

import type { UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export const usePostComment = (
  options?: UseMutationOptions<CommentResponseType, AxiosError, CommentType>
) =>
  useMutation({
    mutationKey: commentQueryKeys.postComment(),
    mutationFn: (comment: CommentType) =>
      post<CommentResponseType>(commentUrl.postComment(), comment),
    ...options,
  });
