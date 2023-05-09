import styles from '@/styles/Home.module.css'
import { Resource } from '../../types'
import Link from 'next/link'

type Props  = {
  resources:Array<Resource>
}

const ResourceOverviewTable:React.FC<Props> = ({resources}:Props) => {
    return (
    <>
        <main className={styles.main}>
        <div className={styles.description}>
          
          {resources&& (<table><thead><tr>
            <th>Resource Name</th>
            <th>Resource Id</th>
            <th>Chemical Composition</th>
            <th>Description</th>
            <th>Planet Id</th>
            </tr>
            </thead>
            <tbody>{resources && resources.map((resource,index)=>(
              <tr key={index}>
                <td>{resource._resource_name}</td>
                <td>{resource._resource_id}</td>
                <td>{resource._chemical_composition}</td>
                <td>{resource._description}</td>
                <td>{resource._planet_id}</td>
                <td><Link href="/resource/edit/[id]" as={`/resource/edit/${resource._resource_id}`}>
                      Edit Resource
                    </Link></td>
                <td><Link href="/resource/delete/[id]" as={`/resource/delete/${resource._resource_id}`}>
                      Delete Resource
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
export default ResourceOverviewTable;