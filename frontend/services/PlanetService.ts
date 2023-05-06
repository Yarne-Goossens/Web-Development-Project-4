const getAllPlanets=()=>{
    return fetch('http://localhost:3000/planet/planetoverview')
}
const getPlanetWithId=(planet_id:any)=>{
    return fetch(`http://localhost:3000/planet/getplanetwithid/${planet_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }})
}
const deletePlanet=(planet_id:any)=>{
    console.log(planet_id)
    return fetch('http://localhost:3000/planet/deleteplanet',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(planet_id)
    })
}
const addPlanet=(planet:any)=>{
    return fetch('http://localhost:3000/planet/addplanet',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(planet)
    })
}
const editPlanet=(planet:any,id:any)=>{
    return fetch(`http://localhost:3000/planet/editplanet/${id}`,{
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