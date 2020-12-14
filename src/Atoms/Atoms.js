import { atom } from 'recoil'

const userState = atom({
  key: 'userState',
  default: {
    username: null,
    isLogin: false,
    isUserCardVerify: false,
    permission: [],
  },
})

const readProductListState = atom({
  key: 'readProductListState',
  default: [],
})

const transactionListState = atom({
  key: 'transactionListState',
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
  transactionListState,
}

export default atomState
