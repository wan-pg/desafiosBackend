import { CartsMongoDao } from "../DAO/cartsMongoDAO.js";
import { ProductosMongoDAO } from "../DAO/productosMongoDAO.js";
import { MisRespuestas } from "../utils/customResponses.js";


const cartsService = new CartsMongoDao
const productosService = new ProductosMongoDAO

//TRAER CART POR ID
export const getCartsById =  async (req, res) =>{
    let cart
    try {
        
        cart = await cartsService.getById(req.params.id)

    } catch (error) {
        return MisRespuestas.respuestaErrorServer(res, `Error inesperado: ${error.message}`)        
    }

    MisRespuestas.respuestaExitosa(res, cart)

}

//CREAR CART

export const createCart = async (req,res)=>{
    let cart = req.body

    //vrificar cart
    let existe =await cartsService.getById({_id: cart._id})
    if (existe) return MisRespuestas.respuestaErrorCliente(res, `Cart con ${id} ya existe`)

    let nuevoCart
    try {
        nuevoCart = await cartsService.create(cart)
    } catch (error) {
        return MisRespuestas.respuestaErrorServer(res, `Error inesperado: ${error.message}`)
        
    }
    MisRespuestas.respuestaExitosa(res, cart)
}

//AGREGAR PRODUCTO AL CARRO

export const addProducto = async (req, res)=>{
    let {cid, pid} = req.params

    //verificar si el cart existe
    let cartEncontrado = await cartsService.getById(cid)
    if(!cartEncontrado) return MisRespuestas.respuestaErrorCliente(res, `Carro con id ${cid} no existe`)

    //verificar si el producto existe
    let productoEncontrado = await productosService.getById(pid)
    if (!productoEncontrado) return MisRespuestas.respuestaErrorCliente(res, `Producto con id ${pid} no existe`)

    // Verificar si el producto ya está en el carrito
    const existingProduct = cartEncontrado.products.findIndex(product => product.producto.toString() === pid);
    if (existingProduct !== -1){
        // Si el producto ya está en el carrito, incrementar la cantidad en 1
        let cartActulizado = await cartsService.update(
            {_id:cid,'products.producto': pid},
            {$inc:{'products.$.quantity': 1}}
        )
    }
}