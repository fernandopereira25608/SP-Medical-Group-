//Verifica se o usuário está logado
export const usuarioAutenticado = () => localStorage.getItem('login') !== null;

//Retorna o payload do usuário convertido em JSON
export const parseJwt = () => {
    //Cria uma váriavel que receberá o valor do payload do token codificado
    let base64 = localStorage.getItem('login').split('.')[1];

    //Cria uma variável com o valor recebido e converte em objeto pelo método .parse
    //atob() -> Decodifica o valor para string
    return JSON.parse(window.atob(base64));
}

