import styles from '@/styles/Home.module.css'
import { Satellite } from '../../types'
import Link from 'next/link'

type Props  = {
  satellites:Array<Satellite>
}

const SatelliteOverviewTable:React.FC<Props> = ({satellites}:Props) => {
    return (
    <>
        <main className={styles.main}>
        <div className={styles.description}>
          
          {satellites&& (<table><thead><tr>
            <th>Satellite Name</th>
            <th>Satellite Id</th>
            <th>Radius</th>
            <th>Semimajor Axis</th>
            <th>Mass</th>
            <th>Planet Id</th>
            </tr>
            </thead>
            <tbody>{satellites && satellites.map((satellite,index)=>(
              <tr key={index}>
                <td>{satellite._satellite_name}</td>
                <td>{satellite._satellite_id}</td>
                <td>{satellite._radius}</td>
                <td>{satellite._semimajor_axis}</td>
                <td>{satellite._mass}</td>
                <td>{satellite._planet_id}</td>
                <td><Link href="/satellite/edit/[id]" as={`/satellite/edit/${satellite._satellite_id}`}>
                      Edit Satellite
                    </Link></td>
                <td><Link href="/satellite/delete/[id]" as={`/satellite/delete/${satellite._satellite_id}`}>
                      Delete Satellite
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
export default SatelliteOverviewTable;