//formItems
const form = document.querySelector('form')
const inputList = document.querySelectorAll('input')
const inputSurname = document.getElementById('surname')
const inputName = document.getElementById('name')
const inputMail = document.getElementById('mail')
const inputPhone = document.getElementById('phone')
const messageArea = document.getElementById('msg')
const formMessage = document.querySelector('.form-message')
// modalItems
const modalContainer = document.querySelector('#myModal')
const removeBtn = document.querySelector('.removeBtn')
const closeModalBtn = document.querySelector('.fermerBtn')

function handleSubmit(e) {
  e.preventDefault()

  const form = {
    surname: inputSurname.value,
    name: inputName.value,
    mail: inputMail.value,
    phone: inputPhone.value,
    message: messageArea.value,
  }

  console.log('Form:', form)

  formValidation()

  setBackToDefault()
}

// ************* EVENT LISTENER *************

form.addEventListener('submit', handleSubmit)

// ************ FORM VALIDATION *************

function formValidation() {
  let formErrors = []

  if (inputSurname.value.length <= 3) {
    inputSurname.style.border = '2px solid red'
    formErrors.push('Surname must be longer than 3 characters*')
  } else {
    inputSurname.style.border = 'black'
  }
  //-------------------------
  if (inputName.value.length <= 2) {
    inputName.style.border = '2px solid red'
    formErrors.push('Name must be longer than 2 characters*')
  } else {
    inputName.style.border = 'black'
  }

  if (inputMail.value.indexOf('@') === -1) {
    inputMail.style.border = '2px solid red'
    formErrors.push('Not a valid Email*')
  } else {
    inputMail.style.border = 'black'
  }

  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$/im
  if (!regex.test(inputPhone.value)) {
    inputPhone.style.border = '2px solid red'
    formErrors.push('Please enter your phone number in correct format!')
  } else {
    inputPhone.style.border = 'black'
  }

  if (messageArea.value.length <= 5) {
    messageArea.style.border = '2px solid red'
    formErrors.push('Message must be longer than 5 characters*')
  } else {
    messageArea.style.border = 'black'
  }

  setTimeout(() => {
    inputList.forEach((input) => {
      input.style.border = 'black'
    })
    ;(messageArea.style.borderColor = 'black'), (formMessage.innerHTML = '')
  }, 3000)

  if (!formErrors.length) {
    openModal()
    formMessage.innerHTML = ''
  } else {
    formMessage.innerHTML = `
            <h3 class="form-error-title">Before sending please correct your errors:</h3>
            <ul class="form-error-list">
                ${formErrors.map((el) => `<li>${el}</li>`).join('')};
            </ul> `
  }
}

// ************** SET BACK TO DEFAULT ***********

function setBackToDefault() {
  inputList.forEach((input) => {
    input.value = ''
  })
  messageArea.value = ''
}

// ************** ADD MODAL *********************

function openModal() {
  modalContainer.style.display = 'block'

  closeModalBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none'
  })

  removeBtn.addEventListener('click', (e) => {
    e.target.parentNode.parentNode.remove()
  })

  window.addEventListener('click', (event) => {
    console.log('click')

    if (event.target === modalContainer) {
      modalContainer.style.display = 'none'
    }
  })
}
