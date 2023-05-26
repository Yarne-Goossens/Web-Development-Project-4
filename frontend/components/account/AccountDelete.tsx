import AccountService from "@/services/AccountService";
import { Account } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


type Props={
    id: number|undefined
}
const AccountDelete: React.FC<Props> = ({id}:Props) => {
const router = useRouter();

  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const fetchPlanet = async () => {
      const account_id = Number(id);
      const response = await AccountService.getAccountWithId(account_id);
      const data = await response.json();
      setAccount(data);
    };

    if (id) {
      fetchPlanet();
    }
  }, [id]);

  const handleDelete = async () => {
    const account_id = Number(id);
    const response = await AccountService.deleteAccount( account_id );
    setTimeout(() => {
      router.push('/account/overview');
    }, 500);
  };

  const handleNoDelete = () => {
    router.push('/account/overview');
  };

  return (<>{account ? (
    <>
      <p>Are you sure you want to delete the planet with id {account._account_id}?</p>
      <p>Username: {account._username}</p>
      <p>Email: {account._email}</p>
      <p>Password: {account._password}</p>
      <a href='#' onClick={handleNoDelete}>No</a>
      <br />
      <a href='#' onClick={handleDelete}>Yes</a>
    </>
  ) : (
    <p>Loading...</p>
  )}</>)}
export default AccountDelete;