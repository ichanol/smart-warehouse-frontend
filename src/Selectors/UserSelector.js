import axios from 'axios'
import { selectorFamily } from 'recoil'
import atomState from '../Atoms/Atoms'

export const userLoginSelector = selectorFamily({
  key: 'UserSelector',
  get: () => ({ get }) => {
    return get(atomState.userState)
  },
  set: (data) => async ({ set, get }) => {
    try {
      set(atomState.userState, data)
    } catch (error) {
    }
  },
})
