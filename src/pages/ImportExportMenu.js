import { Container } from './ImportExportMenuStyle'
import React from 'react'
import atomState from '../Atoms/Atoms'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

const ImportExportMenu = () => {
  const history = useHistory()
  const setUserState = useSetRecoilState(atomState.userState)
  const MOCK_CHOICES = [
    { id: 1, action_type: 'IMPORT', disable: false },
    { id: 2, action_type: 'EXPORT', disable: false },
    { id: 3, action_type: 'EXPIRED', disable: true },
    { id: 4, action_type: 'DAMAGED', disable: false },
  ]
  const selectChoice = (choice) => {
    if (!choice.disable) {
      setUserState((oldState) => ({
        ...oldState,
        action: {
          id: choice.id,
          actionType: choice.action_type,
        },
      }))
      history.push('/import-export/in-progress')
    }
  }

  return (
    <Container>
      <div className='header'>
        <span>Import - Export Menu</span>
      </div>
      <div className='content'>
        {MOCK_CHOICES.map((value, index) => {
          return (
            <div
              key={index}
              className={clsx('choice', value.disable && '-disable')}
              onClick={() => selectChoice(value)}>
              <span>{value.action_type}</span>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default ImportExportMenu
