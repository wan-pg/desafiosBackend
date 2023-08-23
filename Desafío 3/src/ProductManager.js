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
nuevoPto.addProduct(
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    109.95,
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    111,
    5)
    
    nuevoPto.addProduct(
    "Mens Casual Premium Slim Fit T-Shirts",
    "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    22.3,
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    222,
    10)
    
    
    nuevoPto.addProduct(
    "Mens Cotton Jacket",
    "great outerwear jackets for Spring/Autumn/Winter",
    55.99,
    "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    333,
    8)
    
    nuevoPto.addProduct(
    "Mens Casual Slim Fit",
    "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    15.99,
    "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    444,
    7)
    
    nuevoPto.addProduct(
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    695,
    "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    555,
    5)
    
    nuevoPto.addProduct(
    "JSolid Gold Petite Micropave",
    "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days",
    168,
    "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    666,
    5)
    
    nuevoPto.addProduct(
    "White Gold Plated Princess",
    "Classic Created Wedding Engagement Solitaire Diamond Promise Ring",
    9.99,
    "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    777,
    3)
    
    nuevoPto.addProduct(
    "Pierced Owl Rose Gold Plated Stainless Steel Double",
    "Rose Gold Plated Double Flared Tunnel Plug Earrings.",
    10.99,
    "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    888,
    8)
    
    nuevoPto.addProduct(
    "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    "USB 3.0 and USB 2.0 Compatibility Fast data transfers",
    64,
    "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    999,
    10)
    
    nuevoPto.addProduct(
    "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    "Easy upgrade for faster boot up, shutdown, application",
    109,
    "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    1010,
    10)
    

console.log(nuevoPto.getProducts())
//nuevoPto.getProductById(15)
//nuevoPto.getProductById(1)

//nuevoPto.deleteProductById(2)
//nuevoPto.updateProduct(2, "title", "aaaaa")
//console.log(nuevoPto.getProducts())

