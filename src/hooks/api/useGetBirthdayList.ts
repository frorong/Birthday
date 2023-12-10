import { useQuery } from '@tanstack/react-query';

import { get, birthdayQueryKeys, birthdayUrl } from '@/libs';
import type { BirthdayResponseType } from '@/types';

import type { UseQueryOptions } from '@tanstack/react-query';

interface ResponseType {
  data: BirthdayResponseType[];
}

export const useGetBirthdayList = (
  options?: Omit<UseQueryOptions<ResponseType>, 'queryKey'>
) =>
  useQuery({
    queryKey: birthdayQueryKeys.getBirthdayList(),
    queryFn: () => get<ResponseType>(birthdayUrl.getBirthdayList()),
    ...options,
  });
