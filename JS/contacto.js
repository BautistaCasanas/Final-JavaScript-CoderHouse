
const nombre = document.getElementById("name")
const email = document.getElementById("email")
const pass = document.getElementById("password")
const parrafo = document.getElementById("warnings")


$("#form").on("submit", function(e){
    e.preventDefault()

    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML = ""
    if(nombre.value.length <2){
        warnings += `El nombre no es valido <br>`
        entrar = true
    }
    if(!regexEmail.test(email.value)){
        warnings += `El email no es valido <br>`
        entrar = true
    }
    if(pass.value.length < 4){
        warnings += `La contraseña no es valida <br>`
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        parrafo.innerHTML = "Registrado!"
    }

    localStorage.setItem("name", JSON.stringify(nombre.value));

})

$("#boton_RegistroAnimado").on("click", function () {
    $("#caja1").fadeToggle(500);
})