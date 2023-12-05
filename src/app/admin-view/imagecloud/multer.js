import multer from 'multer'


const storage=multer.diskStorage({
    destination:function cb(req,file,cb){
        cb(null,"../../../../public/uploads")
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+'-'+file.originalname)
        
    }
});


const filefilter=(req,res,cb)=>{
    if(file.mimetype==='image/jpeg' ||file.mimetype==='image/jpg'||file.mimetype==='image/png'){
        cb(null,true);
    }else(
        {'error':'Unsupported file'},
        false
    )
}

const upload=multer({
    storage,
    limits:{fileSize:1024*1024},
    filefilter
});


export default upload;