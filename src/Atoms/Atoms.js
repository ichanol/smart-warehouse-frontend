import { atom, selectorFamily } from 'recoil'

const userState = atom({
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

const readProductListState = atom({
  key: 'readProductListState',
  default: [],
})

const toastState = atom({
  key: 'toastState',
  default: [],
})

const modalState = atom({
  key: 'modalState',
  default: {
    isDisplay: false,
    title: null,
    isIndicator: false,
    detail: null,
    onClickNegativeButton: () => {},
    onClickPositiveButton: () => {},
    dismissFN: () => {},
    negativeButton: {},
    positiveButton: {},
    modalType: 'error',
  },
})

const userActionSelector = selectorFamily({
  key: 'userActionSelector',
  get: () => ({ get }) => {
    const user = get(userState)
    return user.action
  },
  set: () => ({ set }) => {
    set(userState, (oldState) => ({
      ...oldState,
      action: { id: null, actionType: null },
    }))
  },
})

const atomState = {
  userState,
  readProductListState,
  toastState,
  modalState,
  userActionSelector,
}

export default atomState
