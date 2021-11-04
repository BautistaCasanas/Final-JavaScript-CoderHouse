

const saludar =()=>{
    let saludo = JSON.parse(localStorage.getItem("name"));
    $("#saludo").append(`
    <div class="saludar">
    Hola ${saludo}, bienvenido a TechShop!
    </div>
    `)
}
saludar();

const urlProductos = "json/productos.json"

jQuery(()=>{
const listado = document.getElementById("listado");
const insertarProductos = () =>{
    $.get(urlProductos, (respuesta, estado)=>{
        console.log(respuesta);
        console.log(estado);
        if(estado === "success"){
            for(const producto of respuesta){
                let contenidoProductos = document.createElement("div")
                contenidoProductos.className= "productos"
                
                contenidoProductos.innerHTML= `<img src="${producto.imagen}"/>
                <div class="descripcion-producto">
                <p> ${producto.nombre} </p>
                <br>
                <b>$${producto.precio} </b>
                
                <input type="button" name="Agregar" value="Agregar" class="botonAgregar" onclick="insertarProductosACanasta(${producto.id})">
                </div>
                `
                
                listado.appendChild(contenidoProductos);
            };
        };
        
    });
};

insertarProductos()


});









