import Header from '../../../../components/header';
import MetaHead from '../../../../components/MetaHead';
import AccountService from '../../../../services/AccountService';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Account } from 'types';
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
