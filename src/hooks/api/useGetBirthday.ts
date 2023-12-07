import { useQuery } from '@tanstack/react-query';

import { get, birthdayQueryKeys, birthdayUrl } from '@/libs';
import type { BirthdayResponseType } from '@/types';

import type { UseQueryOptions } from '@tanstack/react-query';

export const useGetBirthday = (
  id: number,
  options?: Omit<UseQueryOptions<BirthdayResponseType>, 'queryKey'>
) =>
  useQuery({
    queryKey: birthdayQueryKeys.getBirthday(id),
    queryFn: () => get<BirthdayResponseType>(birthdayUrl.getBirthday(id)),
    staleTime: 300000,
    gcTime: 300000,
    ...options,
  });
