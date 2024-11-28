export interface BirthdayType {
  name: string;
  birthday: string;
}

export interface BirthdayResponseType extends BirthdayType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
