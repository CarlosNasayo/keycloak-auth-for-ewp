import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const useAuth = () => {
    const [userInfo, setUserInfo] = useState(null);
    const isRun = useRef(false);
    const keycloak = useRef(null);

    useEffect(() => {
        if (isRun.current) return;
        isRun.current = true;

        keycloak.current = new Keycloak({
            url: 'http://localhost:8080', //poner en variables de entorno
            realm: 'auth-react',//poner en variables de entorno
            clientId: 'myclient',//poner en variables de entorno
        });

        keycloak.current
            .init({ onLoad: "check-sso" })
            .then((authenticated) => {
                if (authenticated) {
                    // Usuario ya autenticado, cargar información del usuario
                    keycloak.current.loadUserInfo().then((userInfo) => {
                        setUserInfo(userInfo);
                        console.log(userInfo)
                        console.log("Usuario autenticado:", userInfo);
                    });
                }
            })
            .catch((error) => {
                console.error("Error inicializando Keycloak:", error);
            });
    }, []);

    const login = () => {
        keycloak.current.login();
    };

    const logout = () => {
        keycloak.current.logout();
        setUserInfo(null);
    };

    return { userInfo, login, logout };
};

export default useAuth;
