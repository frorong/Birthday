export const birthdayUrl = {
  postBirthday: () => '/create',
  getBirthdayList: (month: number) => `/list/${month}`,
  getBirthday: (id: number) => `/${id}`,
  deleteBirthday: (id: number) => `/${id}`,
};

export const commentUrl = {
  postComment: () => '/comment/create',
  getCommentList: (id: number) => `/comment/list/${id}`,
};

export const healthcheckUrl = {
  getHealthcheck: () => '/healthcheck',
};
