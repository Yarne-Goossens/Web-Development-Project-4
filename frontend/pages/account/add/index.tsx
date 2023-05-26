import AccountAdd from '@/components/account/AccountAdd';
import  Header from 'components/header'
import MetaHead from 'components/MetaHead'

const addaccount: React.FC = () => {

    

    return (
      <>
      <Header />
      <MetaHead title="Account Add" />
        
      <AccountAdd/>
    </>)
}
export default addaccount;
