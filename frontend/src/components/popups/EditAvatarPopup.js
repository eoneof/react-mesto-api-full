import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';

import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const nodeRef = useRef(null);
  // Use a reference to a DOM node as `findDOMNode` is deprecated
  // which is used in `CSSTransition` internally

  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit({ avatar: avatarRef.current.value });
  }

  function handleClose() {
    props.onClose();
  }

  function resetValues() {
    avatarRef.current.value = '';
  }

  useEffect(() => {
    props.isOpen && resetValues();
  }, [props.isOpen]);

  return (
    <CSSTransition
      in={props.isOpen}
      nodeRef={nodeRef}
      timeout={200}
      classNames='popup_opened'
      unmountOnExit>
      <PopupWithForm
        ref={nodeRef}
        formTitle='Обновить аватар'
        popupType='update'
        submitButtonText='Сохранить'
        onClose={handleClose}
        onSubmit={handleSubmit}>
        <fieldset className='form__fieldset'>
          <div className='form__input-container'>
            <input
              className='form__input'
              id='updateInput'
              name='avatar'
              type='url'
              placeholder='Ссылка на картинку'
              ref={avatarRef}
              required
            />
            <span className='form__input-error-hint avatar-input-error'></span>
          </div>
        </fieldset>
      </PopupWithForm>
    </CSSTransition>
  );
}

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
