const inputRange = document.querySelector('#password-length')
const inputPassword = document.querySelector('#password')

/**
 * Função para copiar a senha gerada para a área de transferência.
 */
const copy = () => {
  navigator.clipboard.writeText(inputPassword.value)
}

/**
 * Função para gerar uma senha aleatória.
 * 
 * @param {*} length Tamanho da senha.
 */
const generatePassword = (length = 16) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()_+=<>"
  let password = ''

  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }

  inputPassword.value = password
}

/**
 * Adicionando um evento para identificar quando o usuário alterar
 * o valor do input (do range).
 */
inputRange.addEventListener('input', () => {
  generatePassword(inputRange.value)
})

generatePassword()
