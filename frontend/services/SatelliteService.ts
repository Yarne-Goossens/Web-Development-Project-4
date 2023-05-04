const getAllSatellites=()=>{
    return fetch('http://localhost:3000/satellite/satelliteoverview')
}
const addSatellite=(satellite:any)=>{
    console.log(satellite)
    //return fetch(`http://localhost:3000/satellite/addsatellite/${planet_id}`,{
        return fetch('http://localhost:3000/satellite/addsatellite',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(satellite)
    })
}
const SatelliteService={
    getAllSatellites,
    addSatellite
}
export default SatelliteService