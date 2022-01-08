import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

import {  editarProducto, borrarProducto, crearProducto, getUsuario, obtenerProductos, obtenerUsuarios, crearUsuario, login } from "./crud-provider";
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


//-----SECCION CUADRO LOGIN----------
const cuadro_login = document.querySelector("#cuadro_login");
//-----FIN SECCION CUADRO LOGIN----------



//----SECCION - Botones de la barra de navegacion
const btnLogoutNavbar = document.querySelector('#btnLogoutNavbar')
const btnUsuariosNavbar = document.querySelector('#btnUsuariosNavbar')
const btnProductosNavbar = document.querySelector('#btnProductosNavbar')
const btnRegistrarse = document.querySelector('#btnRegistrarse')
//----FIN SECCION - Botones de la barra de navegacion



//Campo para mostrar el email del usuario logueado
const navbar_usuario_logueado = document.querySelector('#usuarioLogueado')
//----FIN SECCION - Botones de la barra de navegacion

//----SECCION HTML TABLAS
// const tablaProductos = document.querySelector('#tablaProductos');
const tablaUsuarios = document.querySelector('#tablaUsuarios');


//----SECCION BOTONES BORRAR Y EDITAR
const btnEditar = document.querySelector('#btnEditar')




//------FUNCIONES-----------------------------



const crearHtmlProductos = (  ) => {
    
    let html = `
    <div style="background-color: #bbb">
        <br>
        <div id="tablaProductos" style="background-color: #ccc">
            <div id="divCrearProducto" class="d-flex justify-content-center">
                <button id="btnCrearProducto" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Crear Producto</button>
            </div>
            <h1 class="mt-5">Catalogo de Productos</h1>
            <table class="table" style="background-color: #ddd">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
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
        <td scope="col"> ${producto.id} </td>
        <td scope="col"> ${producto.titulo} </td>
        <td scope="col"> ${producto.disponible} </td>
        <td scope="col"> ${ producto.valor } </td>
        <td scope="col"> <button class="btn btn-primary" id="${producto.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button></td>
        <td scope="col"> <button class="btn btn-danger" id="${producto.id}">Borrar</button></td>
        <td scope="col"> <img class="img-thumbnail" src="${producto.fotoUrl}" width="80px"> </td>


    `;
    // console.log('crearFilaProducto : creados elementos btnEditar y btnBorrar ');
    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tbody1.appendChild( tr );
}



const crearHtmlLogin = () => {
    const html = `
    <div id="cuadro_login">
        <form method="post">
            <h1 class="mt-5">Login</h1>
                <ul>
                    <li>
                        <label for="email_login">Email:</label>
                        <input type="text" id="email_login" name="email_login">
                    </li>
                    <li>
                        <label for="pw_login">Password:</label>
                        <input type="text" id="pw_login" name="pw_login">
                    </li>
                </ul>
        </form>
        <li class="button">
            <button id="btnLogin" class="btn btn-primary">Login</button>
        </li>
    </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    body.appendChild( div );

}

const crearHtmlRegistro = () => {
    const html = `
    <div id="cuadro_registro">
    <form class="crear_usuario" method="post">
        <h1 class="mt-5">Registrarse</h1>
            <ul>
                <li>
                    <label for="nombre_crear_usuario">Nombre:</label>
                    <input type="text" id="nombre_crear_usuario" name="nombre_crear_usuario">
                </li>
                <li>
                    <label for="email_crear_usuario">email:</label>
                    <input type="text" id="email_crear_usuario" name="email_crear_usuario">
                </li>
                <li>
                    <label for="pw_crear_usuario">Password:</label>
                    <input type="text" id="pw_crear_usuario" name="pw_crear_usuario">
                </li>
            </ul>
        </form>
        <li class="button">
            <button id="btnCrearUsuario" class="btn btn-primary">Crear Usuario</button>
        </li>
</div>
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    body.appendChild( div );

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
    //---------------------BOTON CREAR USUARIO SIGN UP - Funcion  para crear un nuevo usuario quite el boton del html!!!
    // btnCrearUsuario.addEventListener( 'click', async () => {

    //     const usuarioLogin = {
    //         "email": email_crear_usuario.value,
    //         "password": pw_crear_usuario.value,
    //         "returnSecureToken": true,
    //     }
    //     await createUserWithEmailAndPassword(auth, usuarioLogin.email, usuarioLogin.password)
    //         .then((cred) =>{
    //             setUsuarioLogin( cred.user.email );
    //             setToken(user.accessToken);

    //             //console.log('usuario creado exitosamente : ', cred.user.email )
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });

    //         email_crear_usuario.value = '';
    //         pw_crear_usuario.value = '';
    //     } );


    //     //----------BOTON LOGUEAR USUARIO EXISTENTE SIGN IN - Funcion  para loguear un usuario existente
    const loguearUsuario = async (email, pass) => {

        const usuarioLogin = {
            "email": email,
            "password": pass,
            "returnSecureToken": true,
        }
        await signInWithEmailAndPassword(auth, usuarioLogin.email, usuarioLogin.password)
            .then((cred) =>{
                setUsuarioLogin( cred.user.email );
                setToken( cred.user.accessToken);
                console.log('btnLogin : USUARIO LOGUEADO CON  : ', cred.user.email )
                btnLogoutNavbar.style.visibility = 'visible';
                btnUsuariosNavbar.style.visibility = 'visible';
                btnProductosNavbar.style.visibility = 'visible';
                // cuadro_login.parentElement.removeChild(cuadro_login);
                init();
                return true
            })
            .catch((err) => {
                console.log(err.message);
                return false
            });
    }
    
    

    //Boton en barra de navegacion para desplegar formulario de login o registro
    btnRegistrarse.addEventListener( 'click', async () => {
        const cuadro_login = document.querySelector('#cuadro_login');
        if (cuadro_login != null){
            //console.log(cuadro_login);
            cuadro_login.parentElement.removeChild(cuadro_login);
            btnRegistrarse.innerHTML = 'Login';
            crearHtmlRegistro();
            btnLogin = document.querySelectorAll('#btnLogin');
        }else{
            const cuadro_registro = document.querySelector('#cuadro_registro');
            cuadro_registro.parentElement.removeChild(cuadro_registro);
            btnRegistrarse.innerHTML = 'Registro';
            crearHtmlLogin();
            btnLogin = document.querySelectorAll('#btnLogin');

        }
    });


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
            tablaProductos.parentNode.removeChild(tablaProductos);
            init();

            // console.log('btnLogoutNavbar : usuario desauntenticado:');
            // console.log(auth);
        })
        .catch((err) => {
            console.log(err.message);
        });

        setToken('');
        setUsuarioLogin('');
        // btnLogoutNavbar.style.visibility = 'hidden';
        // btnUsuariosNavbar.style.visibility = 'hidden';
        // btnProductosNavbar.style.visibility = 'hidden';

    });






        //-----BOTON PRODUCTOS NAV BAR --------Esta funcion es para desloguear usuario
    btnProductosNavbar.addEventListener('click', async (e) => {
        e.preventDefault();
        //init();
        console.log('btnProductosNavbar: hola mundo');


    });



        //-----BOTON USUARIOS NAV BAR --------Esta funcion es para desloguear usuario
    btnUsuariosNavbar.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('btnUsuariosNavbar: hola mundo');
        crearHtmlUsuarios();
        (await obtenerUsuarios()).forEach( crearFilaUsuario );



    });


//inicio cambio de if por switch-case en tablaProductos
  
//---------------------------------------------Funcion init()------------------------------

export const init = async() => {

//TODO: EL PRIMER IF HAY Q COMPARARLO CON OTRA COSA SINO, LE COLOCO CUALQUIER COSA EN TOKEN Y ENTRO!!!
    if ( !!getUsuarioLogin() ){//SI EXISTE EL USUARIO LOGUEADO CONTINUA EN VERDADERO
        console.log('init:  getUsuarioLogin() estamos logueados es : VERDADERO')
        crearHtmlProductos();
        let tablaProductos = document.querySelector('#tablaProductos');
        //const btnRegistrarse = document.querySelector('#btnRegistrarse')
        // const btnCrearProducto = document.querySelector('#btnCrearProducto');


        //IF solo para quitar el boton de registrarse en la barra de navegacion cuando el usuario se logueó
        // if (!!btnRegistrarse){
        //     console.log('entrando al if de bntRegistrarse ----quitar!!!');
        //     btnRegistrarse.parentElement.removeChild(btnRegistrarse);
        // }

        //(await obtenerUsuarios()).forEach( crearFilaUsuario );
        (await obtenerProductos()).forEach( crearFilaProducto )//No se puede mover mas arriba!!!! ojooo!!!

        //--------Tomar eventos de la tablaProdcutos - es la tabla principal de productos-----
        tablaProductos.addEventListener( 'click', async (e) => {
            e.preventDefault();
            // console.log(e.target);



            switch (e.target.getAttribute('class')) {

                //CASE 0 : PRESIONADO BOTON BORRAR DE tablaProductos PARA BORRAR PRODUCTO----------------
                case 'btn btn-danger':
                    const res =  borrarProducto( e.target.getAttribute('id') )
                    console.log('esta es la respuesta del borrado : ', res);
                    let tablaProductos = document.querySelector('#tablaProductos');//OJO-debe volverse a crear la ref x q sino crea dos tablas seguidas y otros comportamientos extraños                                
                    tablaProductos.remove();
                    crearHtmlProductos();
                    (await obtenerProductos()).forEach( crearFilaProducto )
                    break;

                //CASE 1 : PRESIONADO BOTON EDITAR MODAL DE tablaProductos  PARA EDITAR PRODUCTO------------
                case 'btn btn-primary':
                    console.log('BOTON GRIS EDITAR MODAL DE tablaProductos');
                    //console.log(e.target.getAttribute('id'));
                    let idProducto = e.target.getAttribute('id');
                    const divModal = document.querySelector('.modal-dialog');
                    const formModal= document.querySelector('#formModal')
                    console.log(idProducto);

                    divModal.addEventListener( 'click', async (e) => {
                        e.preventDefault();
                        //console.log(e.target);
                        if (e.target.getAttribute('id') == 'btnCrearModal'){
                            console.log('BOTON ACEPTAR DEL MODAL DE EDITAR');
                            let nombreModal = document.querySelector('#nombreModal');
                            let disponibleModal = document.querySelector('#disponibleModal');
                            let precioModal = document.querySelector('#precioModal');
                            let fotoModal = document.querySelector('#fotoModal');

                            const producto = {
                                "available": disponibleModal.value,
                                "name": nombreModal.value,
                                "picture": fotoModal.value,
                                "price": precioModal.value,
                            }

                            const res =  await editarProducto( idProducto, producto  )
                            formModal.reset();
                            let tablaProductos = document.querySelector('#tablaProductos');//OJO-debe volverse a crear la ref x q sino crea dos tablas seguidas y otros comportamientos extraños                                
                            tablaProductos.remove();
                            crearHtmlProductos();
                            (await obtenerProductos()).forEach( crearFilaProducto )
                        }
                    } );                
                    break;

                //CASE 2 : EVENTO BOTON MODAL PARA CREAR PRODUCTO---------------------------
                case 'btn btn-info':
                        console.log('BOTON AZUL CREAR PRODUCTO MODAL DE tablaProductos');
                        console.log(e.target.getAttribute('class'));
                        const divModal2 = document.querySelector('.modal-dialog');
                        const formModal2= document.querySelector('#formModal')
                        //console.log(divModal);
        
                        divModal2.addEventListener( 'click', async (e) => {
                            e.preventDefault();
                            //console.log(e.target);
                            if (e.target.getAttribute('id') == 'btnCrearModal'){
                                console.log('BOTON ACEPTAR DEL MODAL DE CREAR PRODUCTO');
                                let nombreModal = document.querySelector('#nombreModal');
                                let disponibleModal = document.querySelector('#disponibleModal');
                                let precioModal = document.querySelector('#precioModal');
                                let fotoModal = document.querySelector('#fotoModal');
        
                                const producto = {
                                    "available": disponibleModal.value,
                                    "name": nombreModal.value,
                                    "picture": fotoModal.value,
                                    "price": precioModal.value,
                                }
        
                                const res =  await crearProducto(  producto  )
                                let tablaProductos = document.querySelector('#tablaProductos');//OJO-debe volverse a crear la ref x q sino crea dos tablas seguidas y otros comportamientos extraños                                
                                tablaProductos.remove();
                                formModal2.reset();


                                // console.log(tablaProductos);
                                // console.log(tablaProductos.parentElement)
                                // console.log( tablaProductos.parentNode )

                                //tablaProductos.parentElement.removeChild(tablaProductos);
                                crearHtmlProductos();
                                (await obtenerProductos()).forEach( crearFilaProducto )
                                

                                //const tablaProductos = document.querySelector('#tablaProductos');

                            }
                        } );                
                    break;
            
                //CASE 3 : DEFAULT---------------------------
                default:
                    break;
            }



            //cambio por el caase??
            // //BOTON BORRAR DE tablaProductos PARA BORRAR PRODUCTO--------------------------------------------------------
            // if (e.target.getAttribute('class') == 'btn btn-danger'){
            //     const res =  borrarProducto( e.target.getAttribute('id') )
            //     console.log('esta es la respuesta del borrado : ', res);
            //     tablaProductos.remove();
            //     crearHtmlProductos();
            //     (await obtenerProductos()).forEach( crearFilaProducto )
            // }


            // //BOTON EDITAR MODAL DE tablaProductos  PARA EDITAR PRODUCTO--------------------------------------------------------
            // if (e.target.getAttribute('class') == 'btn btn-primary'){
            //     console.log('BOTON GRIS EDITAR MODAL DE tablaProductos');
            //     //console.log(e.target.getAttribute('id'));
            //     let idProducto = e.target.getAttribute('id');
            //     const divModal = document.querySelector('.modal-dialog');
            //     const formModal= document.querySelector('#formModal')
            //     //console.log(divModal);

            //     divModal.addEventListener( 'click', async (e) => {
            //         e.preventDefault();
            //         //console.log(e.target);
            //         if (e.target.getAttribute('id') == 'btnCrearModal'){
            //             console.log('BOTON ACEPTAR DEL MODAL DE EDITAR');
            //             let nombreModal = document.querySelector('#nombreModal');
            //             let disponibleModal = document.querySelector('#disponibleModal');
            //             let precioModal = document.querySelector('#precioModal');
            //             let fotoModal = document.querySelector('#fotoModal');

            //             const producto = {
            //                 "available": disponibleModal.value,
            //                 "name": nombreModal.value,
            //                 "picture": fotoModal.value,
            //                 "price": precioModal.value,
            //             }

            //             const res =  await editarProducto( idProducto, producto  )
            //             formModal.reset();
            //             //tablaProductos.reset();
            //             tablaProductos.remove();
            //             crearHtmlProductos();
            //             (await obtenerProductos()).forEach( crearFilaProducto )
                        
            //         }
            //     } );
            // }
            //fin de cambio por el caase??


            // //EVENTO BOTON MODAL PARA CREAR PRODUCTO---------------------------
            // if (e.target.getAttribute('class') == 'btn btn-info'){
            //     console.log('BOTON AZUL CREAR PRODUCTO MODAL DE tablaProductos');
            //     console.log(e.target.getAttribute('class'));
            //     const divModal = document.querySelector('.modal-dialog');
            //     const formModal= document.querySelector('#formModal')
            //     //console.log(divModal);

            //     divModal.addEventListener( 'click', async (e) => {
            //         e.preventDefault();
            //         //console.log(e.target);
            //         if (e.target.getAttribute('id') == 'btnCrearModal'){
            //             console.log('BOTON ACEPTAR DEL MODAL DE CREAR PRODUCTO');
            //             let nombreModal = document.querySelector('#nombreModal');
            //             let disponibleModal = document.querySelector('#disponibleModal');
            //             let precioModal = document.querySelector('#precioModal');
            //             let fotoModal = document.querySelector('#fotoModal');

            //             const producto = {
            //                 "available": disponibleModal.value,
            //                 "name": nombreModal.value,
            //                 "picture": fotoModal.value,
            //                 "price": precioModal.value,
            //             }

            //             const res =  await crearProducto(  producto  )
            //             formModal.reset();
            //             //tablaProductos.reset();
            //             tablaProductos.remove();
            //             crearHtmlProductos();
            //             (await obtenerProductos()).forEach( crearFilaProducto )
            //         }
            //     } );
            // }




        });//Fin de listener tablaProductos



        //Para retirar el cuadro login cuando el usuario esta logueado
        if(!!cuadro_login){
            cuadro_login.parentElement.removeChild(cuadro_login);
        }


    }else{//----------USUARIO NO ESTA LOGUEADO-----------------
        console.log('init:  getUsuarioLogin() estamos logueados es : FALSO ')
        crearHtmlLogin();

        const cuadro_login = document.querySelector('#cuadro_login');

        cuadro_login.addEventListener( 'click', async (e) => {
            e.preventDefault();
            console.log(e.target.getAttribute('id'));
            const email = document.querySelector('#email_login');
            const pass = document.querySelector('#pw_login');
            if (e.target.getAttribute('id') == 'btnLogin'){
                const res = await loguearUsuario( email.value, pass.value );
                cuadro_login.parentElement.removeChild(cuadro_login);
                const btnRegistrarse = document.querySelector('#btnRegistrarse')
                if (!!btnRegistrarse){
                    btnRegistrarse.parentElement.removeChild(btnRegistrarse);
                }                // btnRegistrarse.style.visibility = 'hiden';//revisar cual de las dos funca para q no estalle btnRegistrarse.addEventListener
            }
        });



    
        btnLogoutNavbar.style.visibility = 'hidden';
        btnUsuariosNavbar.style.visibility = 'hidden';
        btnProductosNavbar.style.visibility = 'hidden';
        // bloque_productos.parentNode.removeChild(bloque_productos);
        // bloque_usuarios.parentNode.removeChild(bloque_usuarios);

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