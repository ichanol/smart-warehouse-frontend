import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container } from './ImportExportMenuStyle'
import { useSetRecoilState } from 'recoil'
import atomState from '../../Atoms/Atoms'

const ImportExportMenu = () => {
  const history = useHistory()
  const setUserState = useSetRecoilState(atomState.userState)
  const MOCK_CHOICES = [
    { id: 1, action_type: 'IMPORT', disable: false },
    { id: 2, action_type: 'EXPORT', disable: false },
    { id: 3, action_type: 'EXPIRED', disable: true },
    { id: 4, action_type: 'DAMAGED', disable: false },
  ]
  return (
    <Container>
      <div className='header'>
        <span>Import - Export Menu</span>
      </div>
      <div className='content'>
        {MOCK_CHOICES.map((value, key) => {
          return (
            <div
              key={key}
              className={`choice${value.disable ? '-disable' : ''}`}
              onClick={() => {
                if (!value.disable) {
                  setUserState((oldState) => {
                    const temp = { ...oldState }
                    temp.action = {
                      id: value.id,
                      actionType: value.action_type,
                    }
                    return temp
                  })
                  history.push('/import-export/in-progress')
                }
              }}>
              <span>{value.action_type}</span>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default ImportExportMenu
