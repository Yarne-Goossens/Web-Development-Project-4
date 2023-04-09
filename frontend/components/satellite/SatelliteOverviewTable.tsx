import styles from '@/styles/Home.module.css'
import { Satellite } from '../../types'
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