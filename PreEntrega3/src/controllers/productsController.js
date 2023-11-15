import { ProductosMongoDAO } from "../DAO/productosMongoDAO.js";
import { MisRespuestas } from "../utils/customResponses.js";



const productosService = new ProductosMongoDAO //CONECTAR DAO DE PRODUCTO CON EL CONTROLLER


//TRAER LISTADO DE PRODUCTOS
export const getProductos =  async (req, res) =>{
    let productos
    try {
        
        productos = await productosService.get()

    } catch (error) {
        return MisRespuestas.respuestaErrorServer(res, `Error inesperado: ${error.message}`)        
    }

    MisRespuestas.respuestaExitosa(res, productos)

}


//TRAER PRODUCTO POR ID
export const getProductosById =  async (req, res) =>{
    let producto
    try {
        
        producto = await productosService.getById(req.params.id)

    } catch (error) {
        return MisRespuestas.respuestaErrorServer(res, `Error inesperado: ${error.message}`)        
    }

    MisRespuestas.respuestaExitosa(res, producto)

}

//CREAR PRODUCTO
export const createProducto = async (req, res)=>{
    let producto = req.body
    let nuevoProducto
    try {
        let nuevoProducto = await productosService.create(producto)
    } catch (error) {
        return MisRespuestas.respuestaErrorServer(res, `Error inesperado: ${error.message}`)
    }
    MisRespuestas.respuestaExitosaAlta(res, nuevoProducto)

}

//MODIFICAR PRODUCTO
export const updateProducto = async(req,res) =>{

    let id = req.params.id

    let existe = await productosService.getById(id)
    if(!existe) return MisRespuestas.respuestaErrorCliente(res, `producto con id ${id} inexistente`)


    let modifica=req.body 
    if(!modifica.title && !modifica.description && !modifica.price && !modifica.code && !modifica.stock)
    return MisRespuestas.respuestaErrorCliente(res,'Seleccione una propiedad para modificar')

    let resultado
    try {

        let resultado = await productosService.update(id, modifica)
        
    } catch (error) {
        return MisRespuestas.respuestaErrorServer(res, `Error inesperado: ${error.message}`)        
    }

    MisRespuestas.respuestaExitosa(res, resultado)
}

//BORRAR PRODUCTO
export const deleteProducto = async (req,res)=>{
    let id = req.params.id
    let producto

    let existe = await productosService.getById(id)
    if (!existe) return MisRespuestas.respuestaErrorCliente(res, `producto con id ${id} no existe`)

    try {
        
        producto = await productosService.delete(id)

    } catch (error) {
        return MisRespuestas.respuestaErrorServer(res, `Error inesperado: ${error.message}`)        
    }
    MisRespuestas.respuestaExitosa(res, `producto ${id} ha sido eliminado!!`)

    


}