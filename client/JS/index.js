
const Login = {
  email: document.querySelector('[data-js="loginEmailInput"]'),
  password: document.querySelector('[data-js="loginPasswordInput"]'),
  button: document.querySelector('[data-js="loginButton"]')
}

const Register = {
  name: document.querySelector('[data-js="registerNameInput"]'),
  email: document.querySelector('[data-js="registerEmailInput"]'),
  password: document.querySelector('[data-js="registerPasswordInput"]'),
  button: document.querySelector('[data-js="registerButton"]')
}

function init (){
  Login.button.addEventListener('click', login)
  Register.button.addEventListener('click', register)
}

init()

