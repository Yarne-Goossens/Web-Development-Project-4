import AccountLogin from '@/components/account/AccountLogin';
import  Header from 'components/header'
import MetaHead from 'components/MetaHead'


const login: React.FC = () => {

    return (
    
      <>
      <Header />
      <MetaHead title="Planet Add" />
      <AccountLogin />
    </>)
}
export default login;
