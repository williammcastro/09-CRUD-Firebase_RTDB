
const urlCRUD = 'https://reqres.in/api/users';
const urlFirebaseProductos = 'https://real-automotivation-default-rtdb.firebaseio.com/products.json';


const baseUrl = 'identitytoolkit.googleapis.com';
const firebaseToken = 'AIzaSyDFUD7ZaNazbMUPQdwYPxWqQK2IuQ5bmVI';


// //GET se obtiene el usuario
const getUsuario = async(id) => {
    const resp = await fetch(`${ urlCRUD }/${ id }`);
    const {data} = await resp.json();
    //console.log(data);
    return data;
}


// // POST respuesta 400? depende del backend
const crearUsuario = async( usuario ) => {

    const resp = await fetch( `${urlCRUD}`, {
        method: 'POST',
        body: JSON.stringify( usuario ),
        headers: {
            'Content-Type': 'application/json'
        }
    } );

    console.log(await resp.json());//Para probar!
    return await resp.json();
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


// Obtener todos los usuarios
const obtenerUsuarios = async () => {
    const resp = await fetch( urlCRUD );
    const { data:usuarios } = await resp.json();
    //console.log( usuarios );
    return usuarios;
}

//---------------------------------------------Funciones productos en firebase------------------------------
// Obtener los datos de los productos
const obtenerProductos = async () => {
    let productosHtml = [];
    let objProducto = {};

    const resp = await fetch( urlFirebaseProductos );
    const producto   = await resp.json();
    let productos = Object.entries( producto );
    //console.log(productos);

    for (let i = 0; i < productos.length; i++)  {
        // console.log(productos[i][1].name );
        objProducto = {
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


// POST respuesta 400? depende del backend
const crearProducto = async( producto ) => {

    const resp = await fetch( `${ urlFirebaseProductos }`, {
        method: 'POST',
        body: JSON.stringify( producto ),
        headers: {
            'Content-Type': 'application/json'
        }
    } );

    return await resp.json();
}

//Funcion para borrar productos
const borrarProducto = ( id ) => {
    console.log('borrando el id' + id)
    //TODO:completar la funcion
}

//Funcion para actualizar producto
const actualizarProducto = ( id ) =>{
    console.log('actualizando producto ' + id);
    //TODO:completar la funcion
}


export {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarios,
    borrarUsuario,
    obtenerProductos,
    crearProducto,
    borrarProducto

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
Esta es la config para firebase realtime con passwd
{
  "rules": {
    ".read": true, 
    ".write": true,
  }
}
*/




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