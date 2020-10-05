import { atom, selectorFamily } from 'recoil'
const atomState = {}

atomState.userState = atom({
  key: 'userState',
  default: {
    username: null,
    accessToken: null,
    refreshToken: null,
    isLogin: false,
    isUserCardVerify: false,
    action: { id: null, actionType: null },
  },
})

atomState.readProductListState = atom({
  key: 'readProductListState',
  default: [],
})

atomState.toastState = atom({
  key: 'toastState',
  default: [],
})

atomState.modalState = atom({
  key: 'modalState',
  default: {
    isDisplay: false,
    title: null,
    isIndicator: false,
    detail: null,
    negativeButtonFN: () => {},
    positiveButtonFN: () => {},
    dismissFN: () => {},
    negativeButton: {},
    positiveButton: {},
    modalType: 'error',
  },
})

atomState.userActionSelector = selectorFamily({
  key: 'userActionSelector',
  get: () => ({ get }) => {
    const userState = get(atomState.userState)
    return userState.action
  },
  set: () => ({ set }) => {
    set(atomState.userState, (oldState) => {
      const temp = { ...oldState }
      temp.action = { id: null, actionType: null }
      return temp
    })
  },
})

export default atomState
