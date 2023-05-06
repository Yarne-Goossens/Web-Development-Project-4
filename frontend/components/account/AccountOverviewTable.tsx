import styles from '@/styles/Home.module.css'
import { Account } from '../../types'
type Props  = {
  accounts:Array<Account>
}

const AccountOverviewTable:React.FC<Props> = ({accounts}:Props) => {
    return (
    <>
        <main className={styles.main}>
        <div className={styles.description}>
          
          {accounts&& (<table><thead><tr>
            <th>Username</th>
            <th>Email</th>
            <th>Account Id</th>
            </tr>
            </thead>
            <tbody>{accounts && accounts.map((account,index)=>(
              <tr key={index}>
                <td>{account._username}</td>
                <td>{account._email}</td>
                <td>{account._account_id}</td>
              </tr>
            ))}
            </tbody>
            </table>
            )}
        </div>
      </main>
    </>)
}
export default AccountOverviewTable;