import React from 'react';
import { createPortal } from 'react-dom';

import EditAvatarPopup from './popups/EditAvatarPopup';
import EditProfilePopup from './popups/EditProfilePopup';
import AddPlacePopup from './popups/AddPlacePopup';
import ImagePopup from './popups/ImagePopup';
import PopupConfirm from './popups/PopupConfirm';
import InfoTooltip from './popups/InfoTooltip';

export default function Popups(props) {
  return createPortal(
    // render popups in their own div
    <div className='popups'>
      <InfoTooltip
        isOpen={props.isOpen.tooltip}
        onClose={props.onTooltipClose}
        tooltipType={props.tooltipType}
      />
      <EditAvatarPopup
        isOpen={props.isOpen.editAvatar}
        onSubmit={props.onSubmitAvatar}
        onClose={props.onClose}
      />
      <EditProfilePopup
        isOpen={props.isOpen.editProfile}
        onSubmit={props.onSubmitUser}
        onClose={props.onClose}
      />
      <AddPlacePopup
        isOpen={props.isOpen.addCard}
        onSubmit={props.onSubmitNewPlace}
        onClose={props.onClose}
      />
      <PopupConfirm
        isOpen={props.isOpen.confirmDelete}
        onSubmit={props.onSubmitCardDelete}
        onClose={props.onClose}
        selectedCard={props.selectedCard}
      />
      <ImagePopup
        isOpen={props.isOpen.viewImage}
        onClose={props.onClose}
        selectedCard={props.selectedCard}
        clearSelectedCard={props.clearSelectedCard}
      />
    </div>,
    document.querySelector('#mesto-react-app'),
  );
}
