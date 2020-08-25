import React from 'react'
import PropTypes from 'prop-types'
import { Dots } from 'react-activity'
import 'react-activity/dist/react-activity.css'

import { ModalBox, Header, Detail, Container, Button } from './ModalStyle'
const Modal = (props) => {
  return (
    <Container isShow={props.isShow}>
      <ModalBox
        isShow={props.isShow}
        paddingTop={props.dismissButton}
        isIndicator={props.isIndicator}>
        {props.dismissButton && (
          <Button type='button' onClick={props.dismissModal}>
            <span>X</span>
          </Button>
        )}
        {props.header && (
          <Header>
            <span>{props.header}</span>
          </Header>
        )}
        {(props.detail || props.isIndicator) && (
          <Detail>{props.isIndicator ? <Dots /> : props.detail}</Detail>
        )}
      </ModalBox>
    </Container>
  )
}

Modal.defaultProps = {
  isShow: false,
  dismissButton: true,
  dismissModal: () => {},
  header: null,
  detail: null,
  isIndicator: true,
}

Modal.propTypes = {
  isShow: PropTypes.bool,
  dismissButton: PropTypes.bool,
  dismissModal: PropTypes.func,
  header: PropTypes.string,
  detail: PropTypes.any,
  isIndicator: PropTypes.bool,
}

export default Modal
