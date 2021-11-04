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
})
}
const validarFormulario = (form) => {
    form.preventDefault();
    console.log(`Producto: ${form.target.children[0].value}`);   
}

    $("#formulario-buscador").on("submit", validarFormulario);


ingresarSugeridos();
});

