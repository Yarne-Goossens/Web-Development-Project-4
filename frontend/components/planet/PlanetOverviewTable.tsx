import styles from '@/styles/Home.module.css'
import { Planet } from '../../types'
import React, { MouseEvent, MouseEventHandler} from "react";
import Link from 'next/link'
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
                      <td><Link href="/satellite/add/[id]" as={`/satellite/add/${planet._planet_id}`}>
                      Add Satellite
                    </Link></td>
                    <td><Link href="/planet/edit/[id]" as={`/planet/edit/${planet._planet_id}`}>
                      Edit Planet
                    </Link></td>
                    <td><Link href="/planet/delete/[id]" as={`/planet/delete/${planet._planet_id}`}>
                      Delete Planet
                    </Link></td>
                    </tr>
                    {planet._satellites && planet._satellites.length > 0 && (
                      <tr role='button'  onClick={hide_or_show_sat(planet._planet_name)}>
                        <td colSpan={9} ><div id={`showsat${planet._planet_name}`} >show satellites</div>
                          <table id={planet._planet_name} style={{ display: "none" }}>
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
                    
                    {(!planet._satellites || planet._satellites.length === 0) && (
                      <tr>
                        <td colSpan={9}>No satellites available</td>
                      </tr>
                    )}
                    {planet._resources && planet._resources.length > 0 && (
                  <tr role='button' onClick={hide_or_show_res(planet._planet_name)}>
                    <td colSpan={9}>
                      <div id={`showres${planet._planet_name}`}>show resources</div>
                      <table id={`tableres${planet._planet_name}`} style={{ display: "none" }}>
                        <thead>
                          <tr>
                            <th>Resource Name</th>
                            <th>Resource Id</th>
                            <th>Resource Id</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {planet._resources.map((resource, index) => (
                            <tr key={index}>
                              <td>{resource.resource_name}</td>
                              <td>{resource.resource_id}</td>
                              <td>{resource.description}</td>
                              <td>{resource.chemical_composition}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
                {planet._resources && planet._resources.length === 0 && (
                  <tr>
                    <td colSpan={9}>No resources available</td>
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
    const satellites = document.getElementById(planet_name);
    const show = document.getElementById(`showsat${planet_name}`);
    show.innerHTML='';
    if (satellites.style.display === "none") {
      satellites.style.display = "inline";
      show.innerHTML +='hide satellites';
    } else {
      satellites.style.display = "none";
      show.innerHTML +='show satellites';
    }
  };
};

const hide_or_show_res = (planet_name: string): MouseEventHandler<HTMLTableRowElement> => {
  return (event: MouseEvent<HTMLTableRowElement>) => {
    const resources = document.getElementById(`tableres${planet_name}`);
    const show = document.getElementById(`showres${planet_name}`);
    show.innerHTML='';
    if (resources.style.display === "none") {
      resources.style.display = "inline";
      show.innerHTML +='hide resources';
    } else {
      resources.style.display = "none";
      show.innerHTML +='show resources';
    }
  };
};


export default PlanetOverviewTable;