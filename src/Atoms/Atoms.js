import { atom } from 'recoil'

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

const productListState = atom({
  key: 'productListState',
  default: [],
})

const roleListState = atom({
  key: 'roleListState',
  default: [],
})
const userListState = atom({
  key: 'userListState',
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

const atomState = {
  userState,
  readProductListState,
  toastState,
  modalState,
  userListState,
  roleListState,
  productListState,
}

export default atomState
