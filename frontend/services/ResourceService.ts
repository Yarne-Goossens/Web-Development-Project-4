const resourceApiURL = process.env.NEXT_PUBLIC_API_URL_RESOURCE;

const getAllResources=()=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${resourceApiURL}/resourceoverview`,{
        method:'GET',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
            
        },})
}
const getResourceWithId=(resource_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${resourceApiURL}/getresourcewithid/${resource_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }})
}
const addResource=(resource:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${resourceApiURL}/addresource`,{
        method:'POST',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(resource)
    })
}
const editResource=(resource:any,resource_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${resourceApiURL}/editresource/${resource_id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(resource)
    })
}
const deleteResource=(resource_id:any)=>{
    const token=sessionStorage.getItem('token')
    return fetch(`${resourceApiURL}/deleteresource/${resource_id}`,{
        method:'DELETE',
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'application/json'
        }
    })
}
const ResourceService={
    getAllResources,addResource,getResourceWithId,editResource,deleteResource
}
export default ResourceService