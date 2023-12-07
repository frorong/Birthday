export const birthdayQueryKeys = {
  postBirthday: () => ['birthday', 'create'],
  getBirthdayList: () => ['birthday', 'list'],
  getBirthday: (id: number) => ['birthday', String(id)],
  deleteBirthday: (id: number) => ['birthday', 'delete', String(id)],
} as const;

export const commentQueryKeys = {
  postComment: () => ['comment', 'create'],
  getCommentList: (id: number) => ['comment', 'list', String(id)],
} as const;

export const healthcheckQueryKeys = {
  getHealthcheck: () => ['healthcheck'],
} as const;
