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

const isEmailInvalid = (text) => {
  const regex = /^[a-zA-Z\d\.\_]+\@.*[a-zA-Z]+\..*[a-zA-Z\.]$/
  if (regex.exec(text)) {
    return false
  } else {
    return true
  }
}

const isENorTH = (text) => {
  const regex = /[^ก-๙a-zA-Z]/
  if (regex.exec(text)) {
    return true
  } else {
    return false
  }
}

export {
  isFirstCharacterSpace,
  isContainSpecialCharacter,
  engIsContainSpecialCharacter,
  isEmailInvalid,
  isENorTH,
}
