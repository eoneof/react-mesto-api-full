import React, { useContext, cloneElement } from 'react';
import PropTypes from 'prop-types';

import CurrentUserContext from '../contexts/CurrentUserContext';
import Preloader from './Preloader';

export default function Main(props) {
  const { userInfo } = useContext(CurrentUserContext);

  if (!props.contentIsLoaded) {
    return <Preloader />;
  }

  return (
    <main className='main'>
      {/* <!-- PROFILE --> */}
      <section className='profile' data-user-id='' data-user-cohort=''>
        <div className='profile__container'>
          <div
            className='profile__photo-container'
            type='button'
            name='update-profile-photo-button'
            title='Изменить фотографию профиля'>
            <button className='profile__photo-overlay' onClick={props.oneditAvatar} />
            <img
              className='profile__photo'
              alt='Фотография пользователя.'
              src={userInfo.avatar}
            />
          </div>
          <div className='profile__main'>
            <div className='profile__headings'>
              <div className='profile__header'>
                <h1 className='profile__name'>{userInfo.name}</h1>
                <button
                  className='button profile__edit-button'
                  type='button'
                  name='edit-button'
                  title='Редактировать профиль'
                  onClick={props.onEditProfile}></button>
              </div>
              <p className='profile__about'>{userInfo.about}</p>
            </div>
          </div>
        </div>
        <button
          className='button profile__add-button'
          type='button'
          name='add-button'
          title='Добавить фотографии'
          onClick={props.onAddCard}></button>
      </section>

      {/* <!-- CARDS WITH PHOTOS --> */}
      <section className='photos' aria-label='Фотографии пользователя'>
        <ul className='cards-grid'>
          {props.cardsList.map((card) => cloneElement(props.cardComponent, {
            key: card._id,
            cardData: card,
            onCardThumbClick: props.onCardThumbClick,
            // from App.js
            onDeleteButtonClick: props.onDeleteButtonClick,
            onCardLike: props.onCardLike,
            dataIsLoaded: props.contentIsLoaded,
          }))}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  contentIsLoaded: PropTypes.bool,
  oneditAvatar: PropTypes.func,
  onEditProfile: PropTypes.func,
  cardComponent: PropTypes.object,
  onCardThumbClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onCardLike: PropTypes.func,
  onAddCard: PropTypes.func,
  cardsList: PropTypes.array,
};
