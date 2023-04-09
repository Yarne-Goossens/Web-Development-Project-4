const getAllResources=()=>{
    return fetch('http://localhost:3000/resource/resourceoverview')
}
const ResourceService={
    getAllResources
}
export default ResourceService