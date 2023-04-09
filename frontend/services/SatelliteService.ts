const getAllSatellites=()=>{
    return fetch('http://localhost:3000/satellite/satelliteoverview')
}
const SatelliteService={
    getAllSatellites
}
export default SatelliteService