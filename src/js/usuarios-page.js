import { crearProducto, getUsuario, obtenerProductos, obtenerUsuarios } from "./crud-provider";

const body  = document.body;
let tbody1;
let tbody2;
const btnInsert = document.querySelector('#btnInsert');

    // <button type="submit" class="btn btn-light" onclick="writeNewPost()">Submit</button>

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

    <h1 class="mt-5"> Productos - Firebase</h1>

    <table class="table">
    <thead>
        <tr>
            <th scope="col">Articulo</th>
            <th scope="col">Disponible</th>
            <th scope="col">Precio USD</th>
            <th scope="col">Imagen</th>
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


//Funcion para crear un nuevo item en la lista de articulos en firebase
//Leer los campos y meterlos en el objeto
const writeNewPost = () => {
    let valorDelCampo = 'sofacamaaaa2';
    let postData = {
      "available": valorDelCampo,
      "name": "balon",
      "picture": "https://res.cloudinary.com/wmss/image/upload/v1620233614/cxw3qfrcbwiv4lhdfhst.jpg",
      "price": "500",
    };
    crearProducto(postData);
}


//---------------------------------------------Funcion init()------------------------------

export const init = async() => {

    crearHtml();
    (await obtenerUsuarios()).forEach( crearFilaUsuario );
    (await obtenerProductos()).forEach( crearFilaProducto );
}

//----------------------------------------Eventos------------------------------------


    //writeNewPost();

    btnInsert.addEventListener('click', () => {
        console.log('Hola mundo');
        writeNewPost();
    });

