
    //getter para el localstorage
    const getToken = () => {
        let token = '';
        if ( !!sessionStorage.getItem('tokenKey') ){
            
            token = sessionStorage.getItem('tokenKey');
            //console.log('recuperar token');
        }else{
            console.log('no hay token guardados - cliente no logueado');
        }
        return token;
    }


    //Setter para el localstorage
    const setToken = (tokenAuth) => {
        sessionStorage.setItem('tokenKey', tokenAuth);
    }




    //Set para averiguar si el usuario esta logueado usuario de la nav bar
    const getUsuarioLogin = ( ) => {
        let emailUsuarioLogueado = '';
        if(!!sessionStorage.getItem('emailUsuarioLogueado')){
            emailUsuarioLogueado = sessionStorage.getItem('emailUsuarioLogueado');
            //console.log(emailUsuarioLogueado);
        }else{
            console.log('no hay usuario logueado');
            return 'no hay usuario logueado';
        }
        return emailUsuarioLogueado;
    }

    const setUsuarioLogin = (emailUsuario) => {
        sessionStorage.setItem('emailUsuarioLogueado', emailUsuario);
    }


    export {
        getToken,
        setToken,
        getUsuarioLogin,
        setUsuarioLogin
    }
