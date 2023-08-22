
class ProductManager {

    constructor(){
        this.products = []
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

        }       
    

    //Devolver arreeglo con productos
    getProducts(){
        
        return this.products 
         
    }

    //Filtrar Productos por ID
    getProductById(id){
        let productoId = this.products.filter(productid => productid.id === id)

        if (productoId.length === 0){
            console.log("Not Found")
            return
        }

         console.log (productoId)
         return      
    }
}

let nuevoPto = new ProductManager()
nuevoPto.addProduct("wwwww","wwwww",555,"wwwww",444,5)
nuevoPto.addProduct("yyyy","yyyy",555,"yyyy",444,5)
nuevoPto.addProduct("xxxx","xxxx",333,"xxxx",555,5)

console.log(nuevoPto.getProducts())
nuevoPto.getProductById(15)
nuevoPto.getProductById(1)

