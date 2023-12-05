export const login=async(formdata)=>{
    try{
        const resp=await fetch('/api/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata)
        });

        const data=await resp.json();
        return data;
    }catch(err){
        console.log(err);
    }
}