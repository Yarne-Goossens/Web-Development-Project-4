import styles from '@/styles/Home.module.css'
import { Planet } from '../../types'

type Props  = {
  planets:Array<Planet>
}

const PlanetOverviewTable:React.FC<Props> = ({planets}:Props) => {
  
    return (
    <>
        <main className={styles.main}>
        <div className={styles.description}>
          
          {planets&& (<table><thead><tr>
            <th>Planet Name</th>
            <th>Planet Id</th>
            <th>Account Id</th>
            <th>Radius</th>
            <th>Semimajor Axis</th>
            <th>Mass</th>
            </tr>
            </thead>
            <tbody>{planets && planets.map((planet,index)=>(
              <tr key={index}>
                <td>{planet._planet_name}</td>
                <td>{planet._planet_id}</td>
                <td>{planet._account_id}</td>
                <td>{planet._radius}</td>
                <td>{planet._semimajor_axis}</td>
                <td>{planet._mass}</td>
              </tr>
            ))}
            </tbody>
            </table>
            )}
        </div>
      </main>
    </>)
}
export default PlanetOverviewTable;