const planetApiURL = process.env.NEXT_PUBLIC_API_URL_PLANET;

const getAllPlanets=()=>{
    const token=sessionStorage.getItem('token')
    
    return fetch(`${planetApiURL}/planetoverview`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
            
        },})
}
const getPlanetWithId=(planet_id:any)=>{
    return fetch(`${planetApiURL}/getplanetwithid/${planet_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }})
}
const deletePlanet=(planet_id:any)=>{
    console.log(planet_id)
    return fetch(`${planetApiURL}/deleteplanet/${planet_id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
}
const addPlanet=(planet:any)=>{
    return fetch(`${planetApiURL}/addplanet`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(planet)
    })
}
const editPlanet=(planet:any,planet_id:any)=>{
    return fetch(`${planetApiURL}/editplanet/${planet_id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(planet)
    })
}
const PlanetService={
    getAllPlanets,
    addPlanet,deletePlanet,getPlanetWithId,editPlanet
}


export default PlanetService