export interface BirthdayType {
  id: number;
  name: string;
  birthday: Date;
}

export interface BirthdayResponseType extends BirthdayType {
  createdAt: Date;
  updatedAt: Date;
}
