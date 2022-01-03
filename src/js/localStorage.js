
    //getter para el localstorage -  BORRAR Y DEJAR DE EXPORTAR
    const getToken = () => {
        let token = '';
        if ( !!sessionStorage.getItem('tokenKey') ){
            
            token = sessionStorage.getItem('tokenKey');
            //console.log('recuperar token');
        }else{
            console.log('getToken : no hay token guardados - cliente no logueado');
            return 'xurkabhaiutqlkuj';
        }
        return token;
    }


    //Setter para el localstorage - BORRAR Y DEJAR DE EXPORTAR
    const setToken = (tokenAuth) => {
        sessionStorage.setItem('tokenKey', tokenAuth);
    }




    //Set para averiguar si el usuario esta logueado usuario de la nav bar
    const getUsuarioLogin = ( ) => {
        let emailUsuarioLogueado = '';
        if(!!sessionStorage.getItem('emailUsuarioLogueado')){
            emailUsuarioLogueado = sessionStorage.getItem('emailUsuarioLogueado');
            //console.log(emailUsuarioLogueado);
            return emailUsuarioLogueado;
        }else{
            console.log('getUsuarioLogin : no hay usuario logueado');
            return '';
        }
    }

    const setUsuarioLogin = (emailUsuario) => {
        sessionStorage.setItem('emailUsuarioLogueado', emailUsuario);
        console.log('setUsuarioLogin : seteado usuario login : ', emailUsuario)
    }


    export {
        getToken,
        setToken,
        getUsuarioLogin,
        setUsuarioLogin
    }
