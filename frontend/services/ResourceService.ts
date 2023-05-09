const resourceApiURL = process.env.NEXT_PUBLIC_API_URL_RESOURCE;

const getAllResources=()=>{
    return fetch(`${resourceApiURL}/resourceoverview`)
}
const getResourceWithId=(resource_id:any)=>{
    return fetch(`${resourceApiURL}/getresourcewithid/${resource_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }})
}
const addResource=(resource:any)=>{
    return fetch(`${resourceApiURL}/addresource`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(resource)
    })
}
const editResource=(resource:any,resource_id:any)=>{
    return fetch(`${resourceApiURL}/editresource/${resource_id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(resource)
    })
}
const deleteResource=(resource_id:any)=>{
    console.log(resource_id)
    return fetch(`${resourceApiURL}/deleteresource/${resource_id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
}
const ResourceService={
    getAllResources,addResource,getResourceWithId,editResource,deleteResource
}
export default ResourceService