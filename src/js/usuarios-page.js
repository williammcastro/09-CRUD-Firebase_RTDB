import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

import { crearProducto, getUsuario, obtenerProductos, obtenerUsuarios, crearUsuario, login } from "./crud-provider";
import { getToken, getUsuarioLogin, setToken, setUsuarioLogin } from './localStorage'

const firebaseConfig = {
    apiKey: "AIzaSyDFUD7ZaNazbMUPQdwYPxWqQK2IuQ5bmVI",
    authDomain: "real-automotivation.firebaseapp.com",
    databaseURL: "https://real-automotivation-default-rtdb.firebaseio.com",
    projectId: "real-automotivation",
    storageBucket: "real-automotivation.appspot.com",
    messagingSenderId: "801586386155",
    appId: "1:801586386155:web:6e845161377ede2c935aae",
    measurementId: "G-7F230H5HN4"
  };

let tokenAuthFB2 = '';
const app = initializeApp(firebaseConfig);
const auth = getAuth();




const body  = document.body;
let tbody1;
let tbody2;
//botones


//-----SECCION CAJAS DE TEXTO------------------------

//Campos para lectura de formulario -  crear usuario - cajas de texto y boton
const nombre_crear_usuario = document.querySelector('#nombre_crear_usuario');
const email_crear_usuario = document.querySelector('#email_crear_usuario');
const pw_crear_usuario = document.querySelector('#pw_crear_usuario');
const avatar_crear_usuario = document.querySelector('#avatar_crear_usuario');
const btnCrearUsuario       = document.querySelector('#btnCrearUsuario');

//---Campos para lectura de formulario - login - cajas de texto y boton 
const email_login   = document.querySelector('#email_login');
const pw_login      = document.querySelector('#pw_login');
const btnLogin      = document.querySelector('#btnLogin');


//Campos para lectura de formulario - ingresar producto - cajas de texto y boton
const nombre        = document.querySelector("#nombre_insertar_producto");
const disponible    = document.querySelector("#disponible_insertar_producto");
const precio        = document.querySelector("#precio_insertar_producto");
const fotoUrl       = document.querySelector("#imagen_insertar_producto");
const btnIngresarProducto   = document.querySelector('#btnIngresarProducto');







//Campos para lectura de formulario - actualizar producto - cajas de texto y boton


//Campos para lectura de formulario - eliminar producto - cajas de texto y boton







//Campos para lectura de formulario - actualizar usuario - cajas de texto y boton


//Campos para lectura de formulario - borrar usuario - cajas de texto y boton


//-----FIN SECCION CAJAS DE TEXTO------------------------

//-----SECCION CUADROS LOGIN-PRODUCTO-USUARIOS----------
const cuadro_login        = document.querySelector("#cuadro_login");
const cuadro_producto        = document.querySelector("#cuadro_producto");
const cuadro_usuarios        = document.querySelector("#cuadro_usuarios");
const bloque_productos = document.querySelector(".bloque_productos");
const bloque_usuarios = document.querySelector(".bloque_usuarios");
//-----FIN SECCION CUADROS LOGIN-PRODUCTO-USUARIOS----------



//----SECCION - Botones de la barra de navegacion
const btnLogoutNavbar = document.querySelector('#btnLogoutNavbar')
const btnUsuariosNavbar = document.querySelector('#btnUsuariosNavbar')
const btnProductosNavbar = document.querySelector('#btnProductosNavbar')


//Campo para mostrar el email del usuario logueado
const navbar_usuario_logueado = document.querySelector('#usuarioLogueado')
//----FIN SECCION - Botones de la barra de navegacion

//----SECCION HTML TABLAS
const tablaProductos = document.querySelector('#tablaProductos');
const tablaUsuarios = document.querySelector('#tablaUsuarios');


//----SECCION BOTONES BORRAR Y EDITAR
const btnEditar = document.querySelector('#btnEditar')
const btnBorrar = document.querySelector('#btnBorrar');




//------FUNCIONES-----------------------------
let productoCapturado = {};



const crearHtmlProductos = (  ) => {
    
    let html = `

    <div id="tablaProductos">
        <h1 class="mt-5">Catalogo de Productos</h1>
    
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Artículo</th>
                    <th scope="col">Disponible</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Borrar</th>
                    <th scope="col">Imagen</th>
                </tr>
            </thead>
    
            <tbody id="tbody1">
            </tbody>
        </table>
    </div>
        `;
    
        const div = document.createElement('div');
        div.innerHTML = html;
        body.appendChild( div );
    
        tbody1 = document.querySelector('#tbody1');
  
}



const crearHtmlUsuarios = (  ) => {


    let html = `
    <div id="tablaUsuarios">

    <h1 class="mt-5">Usuarios</h1>
        
        <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">email</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Avatar</th>
                    </tr>
                </thead>

            <tbody id="tbody2">
            </tbody>
        </table>
    </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = html;
    body.appendChild( div );

    tbody2 = document.querySelector('#tbody2');
}



const crearFilaUsuario = ( usuario ) => {
    const html = `
        <td scope="col"> ${usuario.id} </td>
        <td scope="col"> ${usuario.email} </td>
        <td scope="col"> ${ usuario.first_name } ${ usuario.last_name } </td>
        <td scope="col"> <img class="img-thumbnail" src="${usuario.avatar}"> </td>
    `;
    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tbody2.appendChild( tr );
}

//---------------------------------------------Funciones productos en firebase------------------------------
//Funcion para hacer el render en html de la fila de cada producto
const crearFilaProducto = ( producto ) => {
    const html = `
        <td scope="col"> ${producto.titulo} </td>
        <td scope="col"> ${producto.disponible} </td>
        <td scope="col"> ${ producto.valor } </td>
        <td scope="col"> <button class="btn btn-primary" id="btnEditar">Editar</button></td>
        <td scope="col"> <button class="btn btn-danger" id="btnBorrar">Borrar</button></td>
        <td scope="col"> <img class="img-thumbnail" src="${producto.fotoUrl}" width="80px"> </td>


    `;
    console.log('crearFilaProducto : creados elementos btnEditar y btnBorrar ');
    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tbody1.appendChild( tr );
}



//-------------------------------FUNCIONES-------------------------------------------

//Funcion para el estado de la auth

onAuthStateChanged( auth, ( user ) =>{
    // console.log('onAuthState : el estatus del usuario ha cambiado : ', user);
    if (user != null){
        navbar_usuario_logueado.innerHTML = user.email;
        // console.log(user.accessToken)

    }else{
        navbar_usuario_logueado.innerHTML = '';
    }

});


//--------------------------------EVENTOS------------------------------------------
    //---------------------BOTON CREAR USUARIO SIGN UP - Funcion  para crear un nuevo usuario
    btnCrearUsuario.addEventListener( 'click', async () => {

        const usuarioLogin = {
            "email": email_crear_usuario.value,
            "password": pw_crear_usuario.value,
            "returnSecureToken": true,
        }
        await createUserWithEmailAndPassword(auth, usuarioLogin.email, usuarioLogin.password)
            .then((cred) =>{
                setUsuarioLogin( cred.user.email );
                setToken(user.accessToken);

                //console.log('usuario creado exitosamente : ', cred.user.email )
            })
            .catch((err) => {
                console.log(err.message);
            });

            email_crear_usuario.value = '';
            pw_crear_usuario.value = '';
        } );


        //----------BOTON LOGUEAR USUARIO EXISTENTE SIGN IN - Funcion  para loguear un usuario existente
    btnLogin.addEventListener( 'click', async () => {

        const usuarioLogin = {
            "email": email_login.value,
            "password": pw_login.value,
            "returnSecureToken": true,
        }
        await signInWithEmailAndPassword(auth, usuarioLogin.email, usuarioLogin.password)
            .then((cred) =>{
                setUsuarioLogin( cred.user.email );
                console.log('signInWithEmailAndPassword.then : escribiendo en setUsuarioLogin : ' , usuarioLogin.email )
                setToken( cred.user.accessToken);
                console.log('USUARIO LOGUEADO CON  : ', cred.user.email )
                btnLogoutNavbar.style.visibility = 'visible';
                btnUsuariosNavbar.style.visibility = 'visible';
                btnProductosNavbar.style.visibility = 'visible';
                cuadro_login.parentElement.removeChild(cuadro_login);
                init();
            })
            .catch((err) => {
                console.log(err.message);
            });

            email_login.value = '';
            pw_login.value = '';
        } );



        //-----BOTON LOGOUT NAV BAR--------Esta funcion es para desloguear usuario
    btnLogoutNavbar.addEventListener('click', async ( e ) => {
        e.preventDefault();
        signOut(auth)
        .then(()=>{
            setToken('');
            setUsuarioLogin('');
            btnLogoutNavbar.style.visibility = 'hidden';
            btnUsuariosNavbar.style.visibility = 'hidden';
            btnProductosNavbar.style.visibility = 'hidden';
            init();

            // console.log('btnLogoutNavbar : usuario desauntenticado:');
            // console.log(auth);
        })
        .catch((err) => {
            console.log(err.message);
        });

        tablaProductos.parentNode.removeChild(tablaProductos);
        setToken('');
        setUsuarioLogin('');
        // btnLogoutNavbar.style.visibility = 'hidden';
        // btnUsuariosNavbar.style.visibility = 'hidden';
        // btnProductosNavbar.style.visibility = 'hidden';

    });






        //-----BOTON PRODUCTOS NAV BAR --------Esta funcion es para desloguear usuario
    btnProductosNavbar.addEventListener('click', async (e) => {
        e.preventDefault();
        init();
        console.log('btnProductosNavbar: hola mundo');


    });



        //-----BOTON USUARIOS NAV BAR --------Esta funcion es para desloguear usuario
    btnUsuariosNavbar.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('btnUsuariosNavbar: hola mundo');
        crearHtmlUsuarios();
        (await obtenerUsuarios()).forEach( crearFilaUsuario );



    });

    //-------BOTONES TABLA BORRAR-----  
    // btnBorrar.addEventListener( 'click', async (e) => {
    //     e.preventDefault();
    //     console.log('btnBorrar: hola mundo');
    // } )

//---------------------------------------------Funcion init()------------------------------

export const init = async() => {

    if ( !!getUsuarioLogin() ){//TODO: HAY Q COMPARARLO CON OTRA COSA SINO, LE COLOCO CUALQUIER COSA EN TOKEN Y ENTRO!!!
        console.log('init:  getUsuarioLogin() es VERDADERO')
        crearHtmlProductos();

        //(await obtenerUsuarios()).forEach( crearFilaUsuario );
        (await obtenerProductos()).forEach( crearFilaProducto );

    }else{
        console.log('init:  getUsuarioLogin() es FALSO ')
        btnLogoutNavbar.style.visibility = 'hidden';
        btnUsuariosNavbar.style.visibility = 'hidden';
        btnProductosNavbar.style.visibility = 'hidden';
        bloque_productos.parentNode.removeChild(bloque_productos);
        bloque_usuarios.parentNode.removeChild(bloque_usuarios);

    }

    
}





//------------version login POST - manual construyendo la url ------ 
        // btnLogin.addEventListener( 'click', async () => {

        // let respLogin = {};

        // const usuarioLogin = {
        //     "email": email_login.value,
        //     "password": pw_login.value,
        //     "returnSecureToken": true,
        // }
        // try {
        //     respLogin = await login(usuarioLogin);
        //     //console.log( respLogin )
        //     if ( !!respLogin.idToken ){
        //         console.log('Usuario correctamente logueado : ' + respLogin.email)
        //         let tokenAuth = respLogin.idToken;//este es el q necesito para hacer get en la bd de firebase
        //         //console.log(tokenAuth );
        //         setToken(tokenAuth);
        //         //Reiniciar la caja de texto de login
        //         email_login.value = '';
        //         pw_login.value = '';
        //         let usuarioNavbar = respLogin.email;
        //         navbar_usuario_logueado.innerHTML = usuarioNavbar;
        //         setUsuarioLogin( usuarioNavbar );
        //     }
        //     else{
        //         console.log(  'Error de login : ' + respLogin.error.message );
        //         navbar_usuario_logueado.innerHTML = '';//manda string vacio al campo login del navBar
        //         alert(respLogin.error.message);
        //         //Reiniciar la caja de texto de login
        //         email_login.value = '';
        //         pw_login.value = '';
        //     }
        // } catch (error) {
        //     navbar_usuario_logueado.innerHTML = '---';
        //     console.log(error)
        //     alert(error);
        //     throw 'Este es un error con el login del usuario';
        // }
        // console.log( typeof(usuarioLogin) );
        //    } );

//------------fin version login POST - manual construyendo la url ------ 

//Esta funcion crea un nuevo usuario de forma mas manual:
// btnCrearUsuario.addEventListener('click', (  ) => {

//     const usuarioCapturado = {
//         "nombre":nombre_crear_usuario.value,
//         "email": email_crear_usuario.value,
//         "password": pw_crear_usuario.value,
//         "returnSecureToken": true,
//         "avatar": avatar_crear_usuario.value
//     }
//     crearUsuario(usuarioCapturado);
//     //reiniciar la caja de texto con caracteres vacios:
//     nombre_crear_usuario.value  = '';
//     email_crear_usuario.value   = '';
//     pw_crear_usuario.value      = '';
//     avatar_crear_usuario.value  = '';
//     alert('nuevo usuario creado : ' + usuarioCapturado.nombre);
// });

//Esta funcion crea un objeto producto y lo envia mediante la fx crearProducto() a la lista html
// btnIngresarProducto.addEventListener('click', () => {
//     productoCapturado = {
//         "available": disponible.value,
//         "name": nombre.value,
//         "picture": fotoUrl.value,
//         "price": precio.value,
//     }
//     crearProducto(productoCapturado);
//     //reiniciar la caja de texto con caracteres vacios:
//     nombre.value = '';
//     disponible.value = '';
//     fotoUrl.value = '';
//     precio.value = '';
//     alert('nueva entrada a la BD : ' + productoCapturado.name);
// });