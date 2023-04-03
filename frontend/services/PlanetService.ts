const getAllPlanets=()=>{
    console.log("getAllPlanets")
    return fetch('http://localhost:8000/api/planetoverview')
}
const PlanetService={
    getAllPlanets
}
export default PlanetService