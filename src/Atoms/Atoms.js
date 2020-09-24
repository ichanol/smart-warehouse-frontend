import { atom } from 'recoil'

export const usernameState = atom({
  key: 'usernameState',
  default: null,
})

export const readProductListState = atom({
  key: 'readProductListState',
  default: [],
})
