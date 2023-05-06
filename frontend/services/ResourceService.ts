const getAllResources=()=>{
    return fetch('http://localhost:3000/resource/resourceoverview')
}
const addResource=(resource:any,planet_id:any)=>{
    return fetch(`http://localhost:3000/resource/addresource/${planet_id}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(resource)
    })
}
const ResourceService={
    getAllResources,addResource
}
export default ResourceService