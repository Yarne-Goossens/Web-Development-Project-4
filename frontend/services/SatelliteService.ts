const satelliteApiURL = process.env.NEXT_PUBLIC_API_URL_SATELLITE;

const getAllSatellites=()=>{
    const token=sessionStorage.getItem('token')

    return fetch(`${satelliteApiURL}/satelliteoverview`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
            
        },})
}
const getSatelliteWithId=(satellite_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${satelliteApiURL}/getsatellitewithid/${satellite_id}`, {
    method: 'GET',
    headers: {
        Authorization:`Bearer ${token}`,
      'Content-Type': 'application/json'
    }})
}
const addSatellite=(satellite:any,planet_id:any)=>{
    const token=sessionStorage.getItem('token')
        return fetch(`${satelliteApiURL}/addsatellite/${planet_id}`,{
        method:'POST',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(satellite)
    })
}
const editSatellite=(satellite:any,satellite_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${satelliteApiURL}/editsatellite/${satellite_id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(satellite)
    })
}
const deleteSatellite=(satellite_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${satelliteApiURL}/deletesatellite/${satellite_id}`,{
        method:'DELETE',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    })
}
const SatelliteService={
    getAllSatellites,
    addSatellite,
    getSatelliteWithId,
    editSatellite,
    deleteSatellite
}
export default SatelliteService