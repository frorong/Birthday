import { useMutation } from '@tanstack/react-query';

import { birthdayQueryKeys, birthdayUrl, post } from '@/libs';
import type { BirthdayType, BirthdayResponseType } from '@/types';

import type { UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export const usePostBirthday = (
  options?: UseMutationOptions<BirthdayResponseType, AxiosError, BirthdayType>
) =>
  useMutation({
    mutationKey: birthdayQueryKeys.postBirthday(),
    mutationFn: (birthday: BirthdayType) =>
      post<BirthdayResponseType>(birthdayUrl.postBirthday(), birthday),
    ...options,
  });
