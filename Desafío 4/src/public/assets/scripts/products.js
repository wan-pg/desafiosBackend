const socket = io()

socket.on('productos',(productos)=>{
    let ul ='';
    productos.forEach(producto => {
        
        ul += `<li>
                    id: ${producto.id}<br>
                    Producto: ${producto.title}<br>
                    Precio:${producto.price}
                </li>`;
        
    });
    let ulProducto = document.getElementById('products');
    ulProducto.innerHTML = ul;
})



