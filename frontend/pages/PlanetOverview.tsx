import  Header from './header'
import MetaHead from './MetaHead'
import styles from '@/styles/Home.module.css'
import { Planet } from '../../backend/domain/model/planet'
import PlanetService from '@/services/PlanetService'
type Props  = {
  planets:Array<Planet>
}


const PlanetOverviewTable:React.FC<Props> = ({planets}:Props) => {
    return (
    <>
        <MetaHead title="Planet Overview" />
        <Header />
        
        <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p>
          {planets&& (<table><thead><tr>
            <th>Planet Name</th>
            <th>Planet Id</th>
            <th>Account Id</th>
            <th>Radius</th>
            <th>Semimajor Axis</th>
            <th>Mass</th>
            </tr>
            </thead>
            <tbody>{planets&& planets.map((planet,index)=>(
              <tr key={index}>
                <td>{planet.planet_name}</td>
                <td>{planet.planet_id}</td>
                <td>{planet.account_id}</td>
                <td>{planet.radius}</td>
                <td>{planet.semimajor_axis}</td>
                <td>{planet.mass}</td>
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