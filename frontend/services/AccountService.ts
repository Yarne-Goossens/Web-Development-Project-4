const getAllPlanets=()=>{
    return fetch('http://localhost:3000/planet/planetoverview')
}
const PlanetService={
    getAllPlanets
}
export default PlanetService