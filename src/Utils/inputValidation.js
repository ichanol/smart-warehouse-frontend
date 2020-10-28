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
  ///[^ก-๙a-zA-Z]/
  if (regex.exec(text)) {
    return true
  } else {
    return false
  }
}

export { firstCharacterCantBeSpace, noSpecialCharacter }
