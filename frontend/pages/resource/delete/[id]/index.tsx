import Header from '../../../../components/header';
import MetaHead from '../../../../components/MetaHead';
import { useRouter } from 'next/router';
import ResourceDelete from '@/components/resource/ResourceDelete';

const deleteConfirm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />
      <MetaHead title="Resource Delete" />

      <ResourceDelete id={Number(id)} />
    </>
  );
};

export default deleteConfirm;
