
  'use strict'
  const token = window.localStorage.getItem('token')
  const nome = document.querySelector("[data-js='username']")
  // Falta imagem 

  async function getUserData() { // Mostrar Dados
    const response = await fetch(
      'http://127.0.0.1:8000/api/users', {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    const { data } = await response.json()
    return data
  }
  async function putUserData() { // Editar
    const userEdit = {
      name: 'Douglas',
      email: 'drs.90@hotmail.com',
      password: '123'
    }
    const response = await fetch(
      'http://127.0.0.1:8000/api/users', {
        method: 'PUT',
        body: JSON.stringify(userEdit),
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
  }
  async function logout() {
    const response = await fetch(
      'http://127.0.0.1:8000/api/users', {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    await response.json().then(() => {
      window.localStorage.clear()
    })
  }
  async function login() {
    const inputs = {
      email: Login.email.value,
      password: Login.password.value
    }

    const response = await fetch('http://127.0.0.1:8000/api/users',
      {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

    if (response.ok) {
      const { data } = await response.json()
      window.localStorage.setItem('token', data.token)
      console.log(window.localStorage)
    } else {
      const { error } = response.json()
      console.log(error)
    }
  }
  
  async function register(e) {
    const newUser = {
      name: Register.name.value,
      email: Register.email.value,
      password: Register.password.value,
    }

    const response = await fetch('http://127.0.0.1:8000/api/users/new',
      {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    if (response.ok) {
      Login.email = Register.email
      Login.password = Register.password
      login();
    } else {
      const { error } = await response.json()
      console.log(error)
    }
  }
