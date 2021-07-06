//EL PROYECTO ESTA HECHO CON EL FRAMEWORk TAILWIND

//Variables
const btnEnviar = document.querySelector("#enviar")
const formulario = document.querySelector("#enviar-mail")
const btnReset = document.querySelector("#resetBtn")

//Variables para campos
const email = document.querySelector("#email")
const asunto = document.querySelector("#asunto")
const mensaje = document.querySelector("#mensaje")

//para validar el mail hacemos una variable global. Si la ponemos dentro del scope de validarmail no podremos usarla despues
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners(){
    //cuando la app arranca
    document.addEventListener("DOMContentLoaded", iniciarApp)

    //campos del formulario
    email.addEventListener("blur", validarFormulario)
    asunto.addEventListener("blur", validarFormulario)
    mensaje.addEventListener("blur", validarFormulario)

    //reinicia el formulario
    btnReset.addEventListener("click", resetearFormulario)

    //enviar email
    formulario.addEventListener("submit", enviarEmail);
}



//Funciones
function iniciarApp(){
    /* pongo en disablen y en gris el boton de enviar */
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed" , "opacity-50")
}


//valida el formulario
function validarFormulario(e){
    
   if(e.target.value.length > 0){

        //Elmina los errores...
        const error = document.querySelector("p.error")
        if(error){
            error.remove();
        }
        e.target.classList.remove("border", "border-red-500"); //borro la que se creo si hubo error o vacio 
        e.target.classList.add("border", "border-green-500");
      

   } else { 
     
        e.target.classList.remove("border", "border-green-500"); //remuevo si estuvo bien y despues lo borró
        e.target.classList.add("border", "border-red-500");
            /* cuando hay un error entonces ejecuto una función */
        mostrarError ("Todos los campos son obligatorios");
    }

    if(e.target.type ==="email"){
        //expresion regular - busca nombre arroba y dominio
        
        /* const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; */
        /* la sbubimos y ponemos como variable global para poder usarla en otros lados*/
        
        if (re.test ( e.target.value ) ){
            //elimina los errores
            const error = document.querySelector("p.error")
            if(error){
                error.remove();
            }
          
            e.target.classList.remove("border", "border-red-500"); //borro la que se creo si hubo error o vacio 
            e.target.classList.add("border", "border-green-500");
            console.log("email valido")
            /* mostrarError("El email no es valido") */

        } else { 
            e.target.classList.remove("border", "border-green-500"); //remuevo si estuvo bien y despues lo borró
            e.target.classList.add("border", "border-red-500");
            mostrarError ("Email no valido");

        }

            //no es tan profesional
        /*  const resultado = e.target.value.indexOf("@")  /* busca que haya al menos un arroba */
        /*  if (resultado < 0){
                mostrarError ("el email no es valido");
            }  */
    }

    /* todo ok, chequeo y habilito boton enviar */
    if(re.test ( email.value ) && asunto.value !== "" && mensaje.value !== ""){
        
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed" , "opacity-50")
    } 

}

function mostrarError(mensaje){
    //creo un elemento en el html
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje
    mensajeError.classList.add ("border", "border-red-500", "background-red-100", "text-red-500", "p-3", "mt-5", "text-center", "error")

    //reviso si hay errores, si ya existe uno previo no quiero agregar mas, solo quiero un mensaje de error
    const errores = document.querySelectorAll(".error");  //.lenght solo existe en All
    if (errores.length === 0){
        formulario.appendChild(mensajeError)  /* lo agrega al final */
      /*  formulario.insertBefore(mensajeError, document.querySelector(".mb-10")) */ /* lo agrega donde le indicamos */
    }
    
    
}

//Envia el email
function enviarEmail (e){
    
    e.preventDefault();

    //mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //despues de tres segundos ocultar el spinner y mostar el msj
    setTimeout( () => {
        spinner.style.display = "none";   
        //mensaje que dice que se envio correctamente
        const parrafo = document.createElement("p");
        parrafo.textContent = "El mensaje se envió correctamente"
        parrafo.classList.add ("text-center", "my-10", "p-2", "bg-green-500", "text-white", "uppercase")
        
        //inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner)

        setTimeout(() =>{
            parrafo.remove(); //elimina el msj despues de 5 seg
            resetearFormulario();
        }, 5000)
    }, 3000 );

}

//funcion que resetea el form
function resetearFormulario(){
    formulario.reset();
    
    iniciarApp();
}