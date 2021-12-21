import '../css/componentes.css';
//import webpacklogo from '../assets/img/webpack-logo.png';//opcion 2: va con opcion 2

export const saludar = ( nombre ) => {
    console.log('Creando etiqueta h1');
    const h1 = document.createElement('h1'); 
    h1.innerText = `Hola ${ nombre }!!!`;
    document.body.append(h1);

    //Imagenes---- 
    //opcion 1 cargo la imagen en los componentes 
    //opcion 2: cargo la imagen directamente en index.html-asi queda
    //console.log(webpacklogo);
    // const img = document.createElement('img');
    // img.src = webpacklogo;
    // document.body.append( img );
}

