import blacklistRecoilState from './blacklistRecoilState'

const blacklistSearcher = (recoilState) => {
  return blacklistRecoilState.find((value, index) => value === recoilState)
}

export default blacklistSearcher
