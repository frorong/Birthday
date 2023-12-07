import { useQuery } from '@tanstack/react-query';

import { get, commentQueryKeys, commentUrl } from '@/libs';
import type { CommentResponseType } from '@/types';

import type { UseQueryOptions } from '@tanstack/react-query';

export const useGetCommentList = (
  id: number,
  options?: Omit<UseQueryOptions<CommentResponseType[]>, 'queryKey'>
) =>
  useQuery({
    queryKey: commentQueryKeys.getCommentList(id),
    queryFn: () => get<CommentResponseType[]>(commentUrl.getCommentList(id)),
    staleTime: 300000,
    gcTime: 300000,
    ...options,
  });
