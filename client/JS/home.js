'use strict'
if (!window.localStorage.token)
  window.location.replace('index.html')


const editDiv = document.querySelector('.edit')
const editImg = document.querySelector("[data-js='editImage']")

const User = {
  image: document.querySelector("[data-js='userImage']"),
  name: document.querySelector("[data-js='userName']"),
  editButton: document.querySelector("[data-js='userEditButton']"),
  logoutButton: document.querySelector("[data-js='logoutButton']"),
}

const EditScreenForm = {
  name: document.querySelector("[data-js='editName']"),
  email: document.querySelector("[data-js='editEmail']"),
  password: document.querySelector("[data-js='editPassword']"),
  confirmButton: document.querySelector("[data-js='editConfirmButton']"),
  cancelButton: document.querySelector("[data-js='editCancelButton']"),
}

const toogleVisibility = (element, button) => event => {
  event.preventDefault()
  const isVisible = element.style.display === 'block'
  element.style.display = isVisible ? 'none' : 'block'
  button.style.display = isVisible ? 'block' : 'none'
}

const toogleEditDiv = toogleVisibility(editDiv, User.editButton)

function initEventListeners() {
  User.editButton.addEventListener('click', toogleEditDiv)
  EditScreenForm.cancelButton.addEventListener('click', toogleEditDiv)
  EditScreenForm.confirmButton.addEventListener('click', edit)
  User.logoutButton.addEventListener('click', logout)
  editImg.addEventListener('change', (e) => {
    if (e)
      console.log(e)
  })
}

async function init() {
  const userData = await getUserData()
  //User.image.src = !!userData.image ? userData.imagem : './testes/default.jpg'
  User.image.src = './testes/default.jpg'

  User.name.textContent = userData.name
  EditScreenForm.name.value = userData.name
  EditScreenForm.email.value = userData.email

  initEventListeners()
}

init()
