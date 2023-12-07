import { useQuery } from '@tanstack/react-query';

import { get, commentQueryKeys, commentUrl } from '@/libs';
import type { CommentResponseType } from '@/types';

import type { UseQueryOptions } from '@tanstack/react-query';

interface ResType {
  data: CommentResponseType[];
}

export const useGetCommentList = (
  id: number,
  options?: Omit<UseQueryOptions<ResType>, 'queryKey'>
) =>
  useQuery({
    queryKey: commentQueryKeys.getCommentList(id),
    queryFn: () => get<ResType>(commentUrl.getCommentList(id)),
    ...options,
  });
