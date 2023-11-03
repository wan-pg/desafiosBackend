

//Traer Productos
async function getProducts(req,res){
    
    try {
        
        let productos = []
        
        res.status(200).json({
            productos
        })
        
    } catch (error) {
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
    }
}

//Crear Productos

async function postProducts(req,res){
    

    try {
        
    } catch (error) {
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
    }
}

export default {getProducts, postProducts}