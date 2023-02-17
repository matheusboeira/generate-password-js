/**
 * Bootstrap enable tooltips.
 */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

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
const combinations = ABC + abc + numbers + symbols

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
 * Função responsável por alterar o texto do tooltip e depois voltar ao original.
 * 
 * @param {*} before Texto antes de ser alterado.
 * @param {*} after  Texto depois de ser alterado.
 * @param {*} elementID  ID do elemento HTML que contém o tooltip.
 */
const changeTooltips = (before, after, elementID) => {
  const tooltipElement = document.querySelector(elementID)
  let tooltip = bootstrap.Tooltip.getInstance(tooltipElement)
  tooltip.hide()

  tooltipElement.title = after
  tooltip = new bootstrap.Tooltip(tooltipElement)
  tooltip.show()

  setTimeout(() => {
    tooltipElement.title = before
    tooltip.hide()
    tooltip = new bootstrap.Tooltip(tooltipElement)
  }, 2500)
}

/**
 * Função para copiar a senha gerada para a área de transferência.
 */
const copy = () => {
  navigator.clipboard.writeText(inputPassword.value)
  changeTooltips('Copiar senha', 'Copiado! 🎉', '#copy')
}

/**
 * Função para alterar o tamanho do texto da senha.
 */
const changeSize = () => {
  const clearClasslist = () => {
    inputPassword.classList.remove('font-sm', 'font-md', 'font-lg', 'font-xl')
  }

  clearClasslist()

  if (inputPassword.value.length <= 26) {
    inputPassword.classList.add('font-xl')
  } else if (inputPassword.value.length <= 39) {
    inputPassword.classList.add('font-lg')
  } else if (inputPassword.value.length <= 52) {
    inputPassword.classList.add('font-md')
  } else {
    inputPassword.classList.add('font-sm')
  }
}

/**
 * Função para calcular a qualidade da senha.
 */
const calculateQuality = () => {
  const inputLength = inputPassword.value.length

  const lengthWeight = (inputLength <= 10 ? 5 : 20)
  const uppercaseWeight = (inputLength <= 12 ? 5 : 15)
  const lowercaseWeight = (inputLength <= 10 ? 5 : 10)
  const numbersWeight = (inputLength <= 4 ? 5 : 25)
  const symbolsWeight = (inputLength <= 18 ? 5 : 30)

  const quality = Math.floor(
    (inputLength / 64 * lengthWeight) +
    (uppercaseCheckbox.checked ? uppercaseWeight : 0) +
    (lowercaseCheckbox.checked ? lowercaseWeight : 0) +
    (numbersCheckbox.checked ? numbersWeight : 0) +
    (symbolsCheckbox.checked ? symbolsWeight : 0)
  )

  securityIndicatorBar.style.width = `${quality}%`
}

/**
 * Função para alterar a cor da barra de segurança. 
 */
const changeBarColor = () => {
  const clearClasslist = () => {
    securityIndicatorBar.classList.remove(
      'critical',
      "warning",
      "safe",
      "completed"
    )
  }

  clearClasslist()
  const quality = parseInt(securityIndicatorBar.style.width)

  if (quality === 100) {
    securityIndicatorBar.classList.add('completed')
    return
  }

  if (quality <= 25) {
    securityIndicatorBar.classList.add('critical')
  } else if (quality <= 50) {
    securityIndicatorBar.classList.add('warning')
  } else {
    securityIndicatorBar.classList.add('safe')
  }
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
  changeBarColor()
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
  changeTooltips('Gerar nova senha', 'Nova senha gerada! 🎉', '#renew')
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

generatePassword()
