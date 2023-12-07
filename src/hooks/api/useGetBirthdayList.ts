import { useQuery } from '@tanstack/react-query';

import { get, birthdayQueryKeys, birthdayUrl } from '@/libs';
import type { BirthdayResponseType } from '@/types';

import type { UseQueryOptions } from '@tanstack/react-query';

export const useGetBirthdayList = (
  options?: Omit<UseQueryOptions<BirthdayResponseType[]>, 'queryKey'>
) =>
  useQuery({
    queryKey: birthdayQueryKeys.getBirthdayList(),
    queryFn: () => get<BirthdayResponseType[]>(birthdayUrl.getBirthdayList()),
    staleTime: 300000,
    gcTime: 300000,
    ...options,
  });
