const urlBuscador = "json/buscador.json"
jQuery(() => {
let posicionSugerido = null;

const ingresarSugeridos = () =>{
$.get(urlBuscador, (respuesta, estado)=>{
    console.log(respuesta);
    console.log(estado);
    if(estado === "success"){
        for (const sugerido of respuesta) {
            $("#sugeridos").append(`<li>${sugerido}</li>`);
        }
    }


$("#buscador-producto").on("focus", () => {$("#sugeridos").toggleClass("activo")});
$("#buscador-producto").on("blur", () => {$("#sugeridos").toggleClass("activo")});


$("#buscador-producto").on("keydown", (e) => {
    if (e.keyCode == '38') { 
    if (posicionSugerido === 0 || posicionSugerido === null) {
        
        posicionSugerido = respuesta.length - 1;
    }
    else  posicionSugerido --; 
        e.target.value = respuesta[posicionSugerido];
    }
    else if (e.keyCode == '40') {
        if (posicionSugerido === (respuesta.length - 1)) {
        posicionSugerido = 0;
    }
    else if (posicionSugerido === null) posicionSugerido = 0;
        else posicionSugerido ++;
        e.target.value = respuesta[posicionSugerido];
    }
});
});
};
const validarFormulario = (form) => {
    form.preventDefault();
    console.log(`Producto: ${form.target.children[0].value}`);   
}

    $("#formulario-buscador").on("submit", validarFormulario);

ingresarSugeridos();

const input = document.querySelector("#buscador-producto");
const botonInput = document.querySelector("#botonInput");
const resultado = document.querySelector("#listado");

const filtrar =()=>{
    resultado.innerHTML="";

    const texto = input.value.toLowerCase();
    $.get(urlProductos, (respuesta, estado)=>{
        if(estado === "success"){
            for(buscador of respuesta){
                let nombre = buscador.title.toLowerCase();
                if(nombre.indexOf(texto)!== -1){
                    resultado.innerHTML += `
                    <div id="productosBuscados">
                    <img id="imgBuscado" src="${buscador.imagen}"/>
                <div class="descripcion-producto">
                <p> ${buscador.nombre} </p>
                <br>
                <b>$${buscador.precio} </b>
                <input type="button" name="Agregar" value="Agregar" class="botonAgregar" onclick="insertarProductosACanasta(${buscador.id})">
                </div>
                </div>
            
                    `
                }
            }
            if(resultado.innerHTML ===""){
                resultado.innerHTML += `
                    <h3 id="notFound">Producto no Encontrado..</h3>`
            }
        }
    });
    
}
botonInput.addEventListener("click", filtrar);

});



