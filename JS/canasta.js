

const canastaLocalStorage = [];

const canasta = document.getElementById("canasta");
const totalPagar = document.getElementById("total-pagar");

const numeroAComas = (total) => {
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const sumarProductos = () => {
    let totalCanasta = 0;
    for (const producto of canastaLocalStorage) {
        console.log(producto.precio.replaceAll(",", ""));
        totalCanasta = totalCanasta + JSON.parse(producto.precio);
    }
    console.log(totalCanasta);
    totalPagar.innerHTML = `$${numeroAComas(totalCanasta)}`
    
}


const eliminarProducto = (producto) => {
    for (const productoCanasta of canasta.children) {
    if (parseInt(productoCanasta.id) === parseInt(producto.id)) {
        productoCanasta.parentElement.removeChild(productoCanasta);
        const index = canastaLocalStorage.indexOf(producto);
        canastaLocalStorage.splice(index, 1);
        localStorage.setItem("canastas", JSON.stringify(canastaLocalStorage));
        sumarProductos();
    }  
    }
}

const insertarProductosACanasta =(producto)=>{

    $.get(urlProductos, (respuesta, estado)=>{
        if(estado === "success"){
    let productoEnCanasta = respuesta.filter(e => e.id == producto);

    if (productoEnCanasta[0] !== undefined){
    console.log(productoEnCanasta[0]);
    let contenedor = document.createElement("div");
    contenedor.className= "productos_Canasta";
    contenedor.id = productoEnCanasta[0].id;
    contenedor.innerHTML = `<img src="${productoEnCanasta[0].imagen}">
    <div class="descripcion-producto">
    <p>${productoEnCanasta[0].nombre}</p>
    <b>$${productoEnCanasta[0].precio}</b>
    </div>`

    let boton = document.createElement("button");
    boton.className = "boton-eliminar";
    boton.innerHTML = "Eliminar";
    boton.onclick = () => eliminarProducto(productoEnCanasta[0]);
    contenedor.appendChild(boton);
    
    canasta.appendChild(contenedor);


    //vaciar todo el carrito
    $("#pagar").on("click", function () {

        canasta.appendChild(contenedor);
        canasta.removeChild(contenedor);
    
        const index = canastaLocalStorage.indexOf(contenedor);
        canastaLocalStorage.splice(index, 1);
        localStorage.setItem("canastas", JSON.stringify(canastaLocalStorage));
        sumarProductos();
    });

    canastaLocalStorage.push(productoEnCanasta[0]);
    localStorage.setItem("canastas", JSON.stringify(canastaLocalStorage));
    
    sumarProductos();
    }else{
        console.log("No hay productos en el carrito!");
    } 
}
});
}


let productosLocalStorage = JSON.parse(localStorage.getItem("canastas"));
console.log(localStorage.getItem("canastas"));

const cargarCanasta =()=>{
    if (productosLocalStorage !== null){
        for (producto of productosLocalStorage) {
            insertarProductosACanasta(producto.id);
            console.log(producto.id);
        }
        }
}

cargarCanasta()
