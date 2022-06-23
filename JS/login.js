let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha')

  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

let btnLogin = document.querySelector('.btnLogin');

btnLogin.addEventListener('click', () => {
  const inputSenha = document.querySelector('#senha');
  const inputUsuario = document.querySelector('#usuario')

  let usuario = inputUsuario.textContent;
  let senha = inputSenha.textContent;

  let user = {
    userProp: usuario,
    senhaProp: senha
  }

  let request = {
    method: 'POST',
    body: JSON.stringify(user)
  }

  // let response = fetch('url', request).then(r => JSON.parse(r))

  const usuarioTeste = "teste@teste.com.br";
  const senhaTeste = "12345";

  if (user.userProp == usuarioTeste && user.senhaProp == senhaTeste) {

    window.location = '/Index.html'
    //Redirecionar para index.
  } else {
    alert("Acesso não liberado.")

  }

});






