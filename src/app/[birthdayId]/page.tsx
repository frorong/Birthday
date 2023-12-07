import { BirthdayInfoPage } from '@/components';

interface Props {
  params: { birthdayId: string };
}

export default function Birthday({ params: { birthdayId } }: Props) {
  return <BirthdayInfoPage birthdayId={birthdayId} />;
}
