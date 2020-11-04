const isFirstCharacterSpace = (text) => {
  const regex = /^[^ก-๙a-zA-Z\d].*$/
  if (regex.exec(text)) {
    return true
  } else {
    return false
  }
}

const isContainSpecialCharacter = (text) => {
  const regex = /[^ก-๙a-zA-Z\s\d\.]/
  if (regex.exec(text)) {
    return true
  } else {
    return false
  }
}

const engIsContainSpecialCharacter = (text) => {
  const regex = /[^a-zA-Z\s\d]/
  if (regex.exec(text)) {
    return true
  } else {
    return false
  }
}

//=============
const firstCharacterCantBeSpace = (text) => {
  const regex = /^\s.*$/
  if (regex.exec(text)) {
    return true
  } else {
    return false
  }
}

const noSpecialCharacter = (text) => {
  const regex = /[!@#$%^&*(),.?":;'/\\{}|<>_+\-~\d]/
  if (regex.exec(text)) {
    return true
  } else {
    return false
  }
}

export { isFirstCharacterSpace, isContainSpecialCharacter, engIsContainSpecialCharacter, firstCharacterCantBeSpace, noSpecialCharacter }
