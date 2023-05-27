import Header from '../../../../components/header';
import MetaHead from '../../../../components/MetaHead';
import { useRouter } from 'next/router';
import AccountDelete from '@/components/account/AccountDelete';

const deleteConfirm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />
      <MetaHead title="Account Delete" />
      <AccountDelete id={Number(id)} />
    </>
  );
};

export default deleteConfirm;
