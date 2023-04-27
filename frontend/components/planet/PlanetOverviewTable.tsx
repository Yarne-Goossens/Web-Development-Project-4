import styles from '@/styles/Home.module.css'
import { Planet } from '../../types'
import React, { MouseEvent, MouseEventHandler} from "react";

type Props  = {
  planets:Array<Planet>
}

const PlanetOverviewTable: React.FC<Props> = ({ planets }: Props) => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
          {planets && (
            <table>
              <thead>
                <tr>
                  <th>Planet Name</th>
                  <th>Planet Id</th>
                  <th>Account Id</th>
                  <th>Radius</th>
                  <th>Semimajor Axis</th>
                  <th>Mass</th>
                </tr>
              </thead>
              <tbody> 
                {planets.map((planet, index) => (
                  <React.Fragment key={index}>
                    <tr >
                      <td>{planet._planet_name}</td>
                      <td>{planet._planet_id}</td>
                      <td>{planet._account_id}</td>
                      <td>{planet._radius}</td>
                      <td>{planet._semimajor_axis}</td>
                      <td>{planet._mass}</td>
                    </tr>
                    {planet._satellites && (
                      <tr onClick={hide_or_show_sat(planet._planet_name)}>
                        <td colSpan={6} ><div id={`show${planet._planet_name}`} >hide satellites</div>
                          <table id={planet._planet_name}>
                            <thead> 
                              <tr>
                                <th>Satellite Name</th>
                                <th>Satellite Id</th>
                                <th>Account Id</th>
                                <th>Radius</th>
                                <th>Semimajor Axis</th>
                                <th>Mass</th>
                              </tr>
                            </thead>
                            <tbody >
                              {planet._satellites.map((satellite, index) => (
                                <tr key={index}>
                                  <td>{satellite.satellite_name}</td>
                                  <td>{satellite.satellite_id}</td>
                                  <td>{satellite.account_id}</td>
                                  <td>{satellite.radius}</td>
                                  <td>{satellite.semimajor_axis}</td>
                                  <td>{satellite.mass}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
};

const hide_or_show_sat = (planet_name: string): MouseEventHandler<HTMLTableRowElement> => {
  return (event: MouseEvent<HTMLTableRowElement>) => {
    
    var x = document.getElementById(planet_name);
    var show=document.getElementById(`show${planet_name}`);
    show.innerHTML='';
    if (x.style.display === "none") {
      x.style.display = "inline";
      show.innerHTML +='hide satellites';
      
    } else {
      x.style.display = "none";
      show.innerHTML +='show satellites';
    }
  };
};



export default PlanetOverviewTable;