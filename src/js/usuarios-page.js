import { crearProducto, getUsuario, obtenerProductos, obtenerUsuarios, crearUsuario } from "./crud-provider";

const body  = document.body;
let tbody1;
let tbody2;
//botones


//-----CAJAS DE TEXTO------------------------

//Campos para lectura de cajas de texto ingresar producto
const nombre        = document.querySelector("#nombre_insertar_producto");
const disponible    = document.querySelector("#disponible_insertar_producto");
const precio        = document.querySelector("#precio_insertar_producto");
const fotoUrl       = document.querySelector("#imagen_insertar_producto");

//Campos para lectura de cajas de texto actualizar producto


//Campos para lectura de cajas de texto eliminar producto


//Campos para lectura de cajas de texto crear usuario
const nombre_crear_usuario = document.querySelector('#nombre_crear_usuario');
const email_crear_usuario = document.querySelector('#email_crear_usuario');
const pw_crear_usuario = document.querySelector('#pw_crear_usuario');
const avatar_crear_usuario = document.querySelector('#avatar_crear_usuario');




//Campos para lectura de cajas de texto actualizar usuario


//Campos para lectura de cajas de texto borrar usuario

//-----BOTONES--------------------------------

const btnIngresarProducto     = document.querySelector('#btnIngresarProducto');
const btnCrearUsuario     = document.querySelector('#btnCrearUsuario');





//------FUNCIONES-----------------------------
let productoCapturado = {};

const crearHtml = () => {
    
    const html = `

    <h1 class="mt-5">Catalogo de Productos</h1>

    <table class="table">
        <thead>
            <tr>
                <th scope="col">Artículo</th>
                <th scope="col">Disponible</th>
                <th scope="col">Precio</th>
                <th scope="col">Imagen</th>
            </tr>
        </thead>

        <tbody id="tbody1">
        </tbody>
    </table>

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
    `;

    const div = document.createElement('div');
    div.innerHTML = html;
    body.appendChild( div );

    tbody1 = document.querySelector('#tbody1');
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
    //console.log(producto);
    const html = `
        <td scope="col"> ${producto.titulo} </td>
        <td scope="col"> ${producto.disponible} </td>
        <td scope="col"> ${ producto.valor } </td>
        <td scope="col"> <img class="img-thumbnail" src="${producto.fotoUrl}" width="80px"> </td>
    `;
    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tbody1.appendChild( tr );
}


//---------------------------------------------Funcion init()------------------------------

export const init = async() => {

    crearHtml();
    (await obtenerUsuarios()).forEach( crearFilaUsuario );
    (await obtenerProductos()).forEach( crearFilaProducto );
}

//----------------------------------------Eventos------------------------------------


//Esta funcion crea un objeto producto y lo envia mediante la fx crearProducto() a la lista html
    btnIngresarProducto.addEventListener('click', () => {
        productoCapturado = {
            "available": disponible.value,
            "name": nombre.value,
            "picture": fotoUrl.value,
            "price": precio.value,
        }
        crearProducto(productoCapturado);
        //reiniciar la caja de texto con caracteres vacios:
        nombre.value = '';
        disponible.value = '';
        fotoUrl.value = '';
        precio.value = '';
        alert('nueva entrada a la BD : ' + productoCapturado.name);
    });


// imagen para probar:
// https://img.joomcdn.net/e3a7b25791a4258c213870b718f451ad3abfed97_original.jpeg


//Esta funcion crea un nuevo usuario:
    //Funcion que ejecuta el turno del jugador con el click

    btnCrearUsuario.addEventListener('click', (  ) => {

        console.log('Hola mundo 33');
        const usuarioCapturado = {
            "nombre":nombre_crear_usuario.value,
            "email": email_crear_usuario.value,
            "password": pw_crear_usuario.value,
            "avatar": avatar_crear_usuario.value
        }
        crearUsuario(usuarioCapturado);
        //reiniciar la caja de texto con caracteres vacios:
        nombre_crear_usuario.value  = '';
        email_crear_usuario.value   = '';
        pw_crear_usuario.value      = '';
        avatar_crear_usuario.value  = '';
        alert('nuevo usuario creado : ' + usuarioCapturado.nombre);
    });
