import styles from '@/styles/Home.module.css'
import { Account } from '../../types'
import Link from 'next/link'

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
                <td><Link href="/account/edit/[id]" as={`/account/edit/${account._account_id}`}>
                      Edit Account
                    </Link></td>
                <td><Link href="/account/delete/[id]" as={`/account/delete/${account._account_id}`}>
                      Delete Account
                    </Link></td>
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