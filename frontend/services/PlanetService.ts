const getAllPlanets=()=>{
    return fetch('http://localhost:3000/planet/planetoverview')
}
const addPlanet=(planet:any)=>{
    console.log(planet)
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
    addPlanet
}


export default PlanetService