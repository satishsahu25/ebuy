

export const registeruser=async(formdata)=>{
    try{    
        const response=await fetch('/api/register',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(formdata)
        });

        const finaldata=await response.json();
        return finaldata;

    }catch(err){
        console.log(err);
    }
}