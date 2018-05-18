'use strict'

const LoginForm = {
  email: document.querySelector('[data-js="loginEmailInput"]'),
  password: document.querySelector('[data-js="loginPasswordInput"]'),
  button: document.querySelector('[data-js="loginButton"]')
}

const RegisterForm = {
  name: document.querySelector('[data-js="registerNameInput"]'),
  email: document.querySelector('[data-js="registerEmailInput"]'),
  password: document.querySelector('[data-js="registerPasswordInput"]'),
  button: document.querySelector('[data-js="registerButton"]')
}

function init() {
  LoginForm.button.addEventListener('click', login)
  RegisterForm.button.addEventListener('click', register)
}

init()
