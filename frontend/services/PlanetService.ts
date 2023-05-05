const getAllPlanets=()=>{
    return fetch('http://localhost:3000/planet/planetoverview')
}
const deletePlanet=(planet_id:any)=>{
    return fetch('http://localhost:3000/planet/deleteplanet',{
        method:'POST',
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
const PlanetService={
    getAllPlanets,
    addPlanet,deletePlanet
}


export default PlanetService