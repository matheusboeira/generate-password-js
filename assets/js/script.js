const inputRange = document.querySelector('#password-length')
const passwordLengthText = document.querySelector('#password-length-text')
const inputPassword = document.querySelector('#password')
const generateNewPassword = document.querySelector('#renew')
const securityIndicatorBar = document.querySelector('#security-indicator-bar')

/**
 * Constantes com os elementos HTML que representam as opções de caracteres.
 */
const uppercaseCheckbox = document.querySelector('#uppercase-check')
const lowercaseCheckbox = document.querySelector('#lowercase-check')
const numbersCheckbox = document.querySelector('#numbers-check')
const symbolsCheckbox = document.querySelector('#symbols-check')

/**
 * Constantes com os caracteres para gerar a senha.
 */
const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const abc = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = "!@#$%&*()_+=<>"

/**
 * Array de opções para gerar a senha.
 */
const options = [
  { checkbox: uppercaseCheckbox, chars: ABC },
  { checkbox: lowercaseCheckbox, chars: abc },
  { checkbox: numbersCheckbox, chars: numbers },
  { checkbox: symbolsCheckbox, chars: symbols }
]

/**
 * Função para copiar a senha gerada para a área de transferência.
 */
const copy = () => {
  navigator.clipboard.writeText(inputPassword.value)
}

const changeSize = () => {
  if (inputPassword.value.length <= 26) {
    inputPassword.style.fontSize = '3rem'
  } else if (inputPassword.value.length <= 39) {
    inputPassword.style.fontSize = '2rem'
  } else if (inputPassword.value.length <= 52) {
    inputPassword.style.fontSize = '1.5rem'
  } else if (inputPassword.value.length <= 64) {
    inputPassword.style.fontSize = '1.2rem'
  }
}

const calculateQuality = () => {
  const quality = Math.floor((inputPassword.value.length / 64) * 100)
  securityIndicatorBar.style.width = `${quality}%`
}

/**
 * Função para gerar uma senha aleatória.
 * 
 * @param {*} length Tamanho da senha.
 */
const generatePassword = (length = 16) => {
  let counter = options.length
  let chars = ''
  let password = ''

  options.forEach(option => {
    if (option.checkbox.checked) {
      chars += option.chars;
    } else {
      counter--
    }
  })

  if (counter === 0) {
    inputPassword.style.fontSize = '2rem'
    inputPassword.value = 'Selecione ao menos uma opção. 🤝'
    return
  }

  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }

  inputPassword.value = password
  changeSize()
  calculateQuality()
}

/**
 * Adicionando um evento para identificar quando o usuário alterar
 * o valor do input (do slider) e atualizar o texto do tamanho da senha. 
 */
inputRange.addEventListener('input', () => {
  generatePassword(inputRange.value)
  passwordLengthText.innerText = inputRange.value
})

/**
 * Adicionando um evento para identificar quando o usuário clicar
 * no botão de gerar nova senha e gerar uma nova senha.
 */
generateNewPassword.addEventListener('click', () => {
  generatePassword(inputRange.value)
})

/**
 * Alterando o tamanho do texto caso o usuário complemente a senha.
 */
inputPassword.addEventListener('input', () => {
  changeSize()
})

/**
 * Adicionando um evento para identificar quando o usuário marcar
 * ou desmarcar as opções de caracteres e gerar uma nova senha.
 */
options.forEach(option => {
  option.checkbox.addEventListener('change', () => {
    generatePassword(inputRange.value)
  })
})

/**
 * Ajustar o tamanho do texto do input da senha.
 */


generatePassword()
