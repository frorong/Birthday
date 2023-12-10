import { useQuery } from '@tanstack/react-query';

import { get, birthdayQueryKeys, birthdayUrl } from '@/libs';
import type { BirthdayResponseType } from '@/types';

import type { UseQueryOptions } from '@tanstack/react-query';

import { AxiosError } from 'axios';

interface ResponseType {
  data: BirthdayResponseType[];
}

export const useGetBirthdayList = (
  month: number,
  options?: Omit<UseQueryOptions<ResponseType>, 'queryKey'>
) =>
  useQuery({
    queryKey: birthdayQueryKeys.getBirthdayList(month),
    queryFn: () => get<ResponseType>(birthdayUrl.getBirthdayList(month)),
    ...options,
  });
