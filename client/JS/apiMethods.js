
'use strict'

const token = window.localStorage.getItem('token')

const url = 'http://127.0.0.1:8000/api/users'
const headers = {
  'Authorization': 'Bearer ' + token,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const jsonFromForm = ({ name = '', email, password }) => (
  JSON.stringify({
    name: name.value,
    email: email.value,
    password: password.value,
  })
)

async function getResponse(url, methodType, form) {
  const fetchObj = {
    method: methodType,
    headers
  }
  if (!!form)
    fetchObj.body = jsonFromForm(form)
  return fetch(
    url, fetchObj)
}

async function getUserData() {
  const response = await getResponse(url, 'get')
  const { data } = await response.json()
  return data
}

async function edit(e) {
  e.preventDefault()
  const response = await getResponse(url, 'put', EditScreenForm)
  if (response.ok)
    window.location.reload()
}

async function logout(e) {
  e.preventDefault()
  const response = await getResponse(url, 'delete')
  if (response.ok) {
    window.localStorage.clear()
    window.location.replace('index.html')
  }
}

async function login(e) {
  e.preventDefault()
  const response = await getResponse(url, 'post', LoginForm)
  if (response.ok) {
    const { data } = await response.json()
    window.localStorage.setItem('token', data.token)
    window.location.replace('home.html')
  } else {
    e.preventDefault()
    const { error } = response.json()
    console.log(error)
  }
}

async function register(e) {
  e.preventDefault()
  const response = await getResponse(`${url}/new`, 'post', RegisterForm)
  if (response.ok) {
    LoginForm.email = RegisterForm.email
    LoginForm.password = RegisterForm.password
    login(e);
  } else {
    const { error } = await response.json()
    console.log(error)
  }
}

function swapImage(e) {
  var reader = new FileReader();

  reader.onload = function (e) {
    User.image.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
  console.log('Troca aqui mas não no banco :(')
}

/* Tentativas de trocar imagem no banco
  async function editImage(e, reader) {
    //e.preventDefault()
    let image = e.target.files[0]
    //const image = reader.result
    const response = await fetch(
      url + '/image', {
        method: 'post',
        body: image,
        headers: {
          'Authorization': 'Bearer ' + token,
          //'Accept': 'multipart/form-data',
          //'Content-Type': 'multipart/form-data'
        }
      })
    //window.location.reload()
  }
*/