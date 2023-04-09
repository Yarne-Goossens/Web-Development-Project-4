import styles from '@/styles/Home.module.css'
import { Resource } from '../../types'
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