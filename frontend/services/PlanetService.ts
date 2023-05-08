const planetApiURL = process.env.NEXT_PUBLIC_API_URL_PLANET;

const getAllPlanets=()=>{
    console.log(planetApiURL)
    return fetch(`${planetApiURL}/planetoverview`)
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
    return fetch(`${planetApiURL}/planet/editplanet/${planet_id}`,{
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