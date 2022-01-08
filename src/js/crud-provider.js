
import { getToken } from './localStorage'

const urlCRUD = 'https://reqres.in/api/users';
const urlFirebaseProductos = 'https://real-automotivation-default-rtdb.firebaseio.com/products.json';
const urlFirebase = 'https://real-automotivation-default-rtdb.firebaseio.com/products/';


const baseUrlUsuarios = 'https://identitytoolkit.googleapis.com';
const firebaseToken = 'AIzaSyDFUD7ZaNazbMUPQdwYPxWqQK2IuQ5bmVI';


// //GET se obtiene el usuario
const getUsuario = async(id) => {
    const resp = await fetch(`${ urlCRUD }/${ id }`);
    const {data} = await resp.json();
    //console.log(data);
    return data;
}


// loguear usuario en firebase/usuarios con POST - construyendo el url
const login = async( usuario ) => {

    const loginUser = '/v1/accounts:signInWithPassword?key=';
    let resp = '';

    try {
        resp = await fetch( `${baseUrlUsuarios}${loginUser}${firebaseToken}`, {
        method: 'POST',
        body: JSON.stringify( usuario ),
        headers: {
            'Content-Type': 'application/json'
        }
    } );
    //console.log('try correctamente ejecutado');
    }catch(err){
        navbar_usuario_logueado.innerHTML = '***';
        console.log(err);
        throw 'Error con el login del usuario : '
    }
    //console.log( resp.json() );//Para probar!
    console.log('antes del return');
    return await resp.json();
}



// crear usuario en firebase/usuarios de la bd POST - construyendo el url
const crearUsuario = async( usuario ) => {

    const crearUsuario = '/v1/accounts:signUp?key=';
    let resp = '';

    try {
            resp = await fetch( `${baseUrlUsuarios}${crearUsuario}${firebaseToken}`, {
            method: 'POST',
            body: JSON.stringify( usuario ),
            headers: {
                'Content-Type': 'application/json'
            }
        } );

    }catch(err){
        console.log(err);
        throw 'Error con la creacion del usuario : '
    }
    //console.log(await resp.json());//Para probar!
    //return await resp.json();
}


// //PUT - respuesta 200
const actualizarUsuario = async( id, usuario ) => {

    const resp = await fetch( `${urlCRUD}/${id}`, {
        method: 'PUT',
        body: JSON.stringify( usuario ),
        headers: {
            'Content-Type': 'application/json'
        }
    } );
    return await resp.json();
}


// // DELETE borrar usuario - respuesta 204 - depende del backend como lo cuadro
const borrarUsuario = async( id ) => {
    const resp = await fetch(`${urlCRUD}/${id}`, {
        method: 'DELETE'
    });
    return ( resp.ok ) ? 'Borrado' : 'No se pudo eliminar';
}


// Funcion para Obtener todos los usuarios
const obtenerUsuarios = async () => {
    const resp = await fetch( urlCRUD );
    const { data:usuarios } = await resp.json();
    //console.log( usuarios );
    return usuarios;
}

//---------------------------------------------Funciones productos en firebase------------------------------
// Funcion para obtener todos los productos
    //Cuando se usa auth se debe usar tokenAuthFB que se recupera en el login, para construir la peticion
    //https://real-automotivation-default-rtdb.firebaseio.com/products.json?auth=tokenAuthFB
    //const resp = await fetch( urlFirebaseProductos );

const obtenerProductos = async () => {
    let productosHtml = [];
    let objProducto = {};

    let varAuth = '?auth='
    let tokenAuthFB = getToken();

    //const resp = await fetch( urlFirebaseProductos );//fetch sin auth!
    const resp = await fetch( `${urlFirebaseProductos}${varAuth}${tokenAuthFB}` );

    const producto   = await resp.json();
    let productos = Object.entries( producto );
    // console.log(productos);

    for (let i = 0; i < productos.length; i++)  {
        // console.log(productos[i][0] );
        objProducto = {
            'id'         : productos[i][0],
            'titulo'     : productos[i][1].name,
            'disponible' : productos[i][1].available,
            'fotoUrl'    : productos[i][1].picture,
            'valor'      : productos[i][1].price,
        }
        productosHtml.push( objProducto )
    }
    //console.log( productosHtml );
    return productosHtml;
}


// POST respuesta 400? depende del backend funcion ok, en postman no se como se envia el producto!!!
const crearProducto = async( producto ) => {
    let varAuth = '.json?auth='
    let tokenAuthFB = getToken();

    const resp = await fetch( `${ urlFirebase }${varAuth}${tokenAuthFB}`, {
        method: 'POST',
        body: JSON.stringify( producto ),
        headers: {
            'Content-Type': 'application/json'
        }
    } );

    return await resp.json();
}



//Funcion para borrar productos
const borrarProducto = async ( id ) => {

    alert(`Seguro desea borrar el articulo : ${id}`  )
    let varAuth = '.json?auth='
    let tokenAuthFB = getToken();
    const resp = await fetch(`${ urlFirebase }${id}${varAuth}${tokenAuthFB}`, {
        method: 'DELETE'
    });
    return ( resp.ok ) ? console.log('Articulo Borrado') : console.log('No se pudo eliminar');}





//Funcion para actualizar producto
const editarProducto = async( id, producto ) =>{
    console.log('editando el producto id : ' + id);
    let varAuth = '.json?auth='
    let tokenAuthFB = getToken();

    const resp = await fetch(`${ urlFirebase }${id}${varAuth}${tokenAuthFB}`, {
        method: 'PATCH',
        body: JSON.stringify( producto ),
        headers: {
            'Content-Type': 'application/json'
        }
    } );

    // return await resp.json();}
    return ( resp.ok ) ? console.log('Articulo Editado') : console.log('No se pudo editar');}



   







export {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarios,
    borrarUsuario,
    obtenerProductos,
    crearProducto,
    borrarProducto,
    editarProducto,
    login

}


/*
Esta es la config para firebase realtime con passwd
{
  "rules": {
    ".read": "now < 1622610000000",  // 2021-6-2
    ".write": "now < 1622610000000",  // 2021-6-2
  }
}
*/

/*
Esta es la config para firebase realtime sin passwd
{
  "rules": {
    ".read": true, 
    ".write": true,
  }
}
*/


/*
Esta es la config para firebase realtime con auth - hay mas reglas para aplicar
{
  "rules": {
    ".read": "auth != null", // 2021-6-2
    ".write": "auth != null", // 2021-6-2
  }
}



/*
-MZxQ8Oehkzfb5PGTSGx
disponible true
fotoUrl :"https://res.cloudinary.com/wmss/image/upload/v1620233195/uazbfwvtmg9zvyxohoud.jpg"
titulo Bose
valor 10

-MZxRjataiwSTMQ8n_Un
disponible true
fotoUrl :"https://res.cloudinary.com/wmss/image/upload/v1620233614/cxw3qfrcbwiv4lhdfhst.jpg"
titulo Mouse
valor 5
*/


