export interface BirthdayType {
  name: string;
  birthday: Date;
}

export interface BirthdayResponseType extends BirthdayType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
