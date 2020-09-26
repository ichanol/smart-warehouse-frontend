import { atom } from 'recoil'
const atomState = {}

atomState.userState = atom({
  key: 'userState',
  default: {
    username: null,
    accessToken: null,
    refreshToken: null,
    isLogin: false,
    isUserCardVerify: false,
  },
})

atomState.readProductListState = atom({
  key: 'readProductListState',
  default: [],
})

export default atomState
