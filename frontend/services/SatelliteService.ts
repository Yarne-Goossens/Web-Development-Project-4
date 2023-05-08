const satelliteApiURL = process.env.NEXT_PUBLIC_API_URL_SATELLITE;

const getAllSatellites=()=>{
    return fetch(`${satelliteApiURL}/satelliteoverview`)
}
const getSatelliteWithId=(satellite_id:any)=>{
    return fetch(`${satelliteApiURL}/getsatellitewithid/${satellite_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }})
}
const addSatellite=(satellite:any)=>{
        return fetch(`${satelliteApiURL}/addsatellite`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(satellite)
    })
}
const editSatellite=(satellite:any,satellite_id:any)=>{
    return fetch(`${satelliteApiURL}/satellite/editsatellite/${satellite_id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(satellite)
    })
}
const SatelliteService={
    getAllSatellites,
    addSatellite,
    getSatelliteWithId,
    editSatellite
}
export default SatelliteService