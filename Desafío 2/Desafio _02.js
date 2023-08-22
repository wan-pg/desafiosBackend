const fs=require('fs')



class ProductManager {

    constructor(path= './archivos/productos.json'){
        this.products = [],
        this.path = path
    }

    // Agregar nuevo producto
    addProduct(title,description,price,thumbnail,code,stock){
        let producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        //Generación id

        if(this.products.length === 0){
            producto.id = 1
        }else{
            producto.id = this.products[this.products.length - 1].id + 1

        }

        //Verificar code
        if(this.products.length > 0){
            let codeCheck = this.products.find(codigo => codigo.code === code)
            if (codeCheck){
                console.log("Error: Producto con el mismo código ya existe");
                return
                
            }      

            }
            this.products.push(producto)
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 5))

        }       
    

    //Devolver arreeglo con productos
    getProducts(){

        if(fs.existsSync(this.path)){
            return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }else return []
        
        //return this.products 
         
    }

    //Filtrar Productos por ID
    getProductById(id){
        
        let productoBuscado = this.getProducts()

        let productoId = productoBuscado.filter(productid => productid.id === id)

        if (productoId.length === 0){
            console.log("Not Found")
            return
        }

         console.log (productoId)
         return      
    }

    //Eliminar producto por id
    deleteProductById(id){
        
        let productoBuscado = this.getProducts()

        let productoId = productoBuscado.filter(productid => productid.id !== id)

        if (productoId.length === 0){
            console.log("Not Found")
            return
        }

         //console.log (productoId)
         fs.writeFileSync(this.path, JSON.stringify(productoId, null, 5))

         return      
    }

    //Actualizar producto
    updateProduct(id, propiedad, nuevoValor){
        //Trae productos actuales en el archivo. json
        let productoBuscado = this.getProducts()
      

        //Busca el producto que se quiere actualizar
        let productoEncontrado = productoBuscado.find(producto => producto.id === id)

        //Verificar id
        if (productoEncontrado === undefined){
            console.log(`producto con id ${id} no existe`)
            return
        }

        //Modifica la propiedad seleccionada
        productoEncontrado[propiedad] = nuevoValor
        fs.writeFileSync(this.path, JSON.stringify(productoBuscado, null, 5))      
                   
        
        return

    }

}

let nuevoPto = new ProductManager()
nuevoPto.addProduct("wwwww","wwwww",555,"wwwww",444,5)
nuevoPto.addProduct("yyyy","yyyy",555,"yyyy",444,5)
nuevoPto.addProduct("xxxx","xxxx",333,"xxxx",555,5)

console.log(nuevoPto.getProducts())
//nuevoPto.getProductById(15)
//nuevoPto.getProductById(1)

//nuevoPto.deleteProductById(2)
//nuevoPto.updateProduct(2, "title", "aaaaa")
//console.log(nuevoPto.getProducts())

