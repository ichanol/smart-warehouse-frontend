import { atomState } from '../Atoms'

const atomSearcher = (atom) => {
  const arr = Object.entries(atomState)
  let atomObj
  arr.forEach((element) => {
    if (element[0] === atom) {
      atomObj = element[1]
    }
  })
  return atomObj
}

export default atomSearcher
