import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Api from '../utils/Api';
import * as auth from '../utils/auth';
import * as utils from '../utils/utils';
import * as consts from '../utils/constants';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Popups from './Popups';
import Card from './Card';
import Login from './Login';
import Register from './Register';

import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoutes from './ProtectedRoutes';

export default function App() {
  const popupsStates = {
    editAvatar: false,
    editProfile: false,
    addCard: false,
    viewImage: false,
    confirmDelete: false,
    tooltip: false,
  };
  const [isOpen, setIsOpen] = useState(popupsStates);
  const [tooltipType, setTooltipType] = useState('');

  // show only header and spinner until data is fetched
  const [contentIsLoaded, setContentIsLoaded] = useState(false);
  const [cardsList, setCardsList] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState({}); // from Api
  const [userData, setUserData] = useState({}); // from auth
  const navigate = useNavigate();

  const token = utils.getToken();

  function updateOpenedState(key, value) {
    Object.keys(popupsStates).forEach((item) => {
      if (item === key) {
        popupsStates[item] = value;
      }
    });
    setIsOpen(popupsStates);
  }

  function closeAllPopups() {
    Object.keys(popupsStates).forEach((item) => {
      popupsStates[item] = false;
    });
    setIsOpen(popupsStates);
  }

  function openEditAvatarPopup() {
    updateOpenedState('editAvatar', true);
  }

  function openEditProfilePopup() {
    updateOpenedState('editProfile', true);
  }

  function openNewCardPopup() {
    updateOpenedState('addCard', true);
  }

  function openConfirmDeletePopup(cardData) {
    updateOpenedState('confirmDelete', true);
    setSelectedCard(cardData);
  }

  function openImageViewPopup(cardData) {
    updateOpenedState('viewImage', true);
    setSelectedCard(cardData);
  }

  function clearSelectedCard() {
    setSelectedCard({});
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate(consts.paths.login);
  }

  function showTooltip(type) {
    setTooltipType(type);
    updateOpenedState('tooltip', true);
  }

  function handleTooltipClose(type) {
    closeAllPopups();
    if (type === 'success') {
      navigate(consts.paths.login);
    }
  }

  const api = new Api(consts.apiConfig);

  function getAllData() {
    Promise.all([api.getUserInfo(token), api.getCardsList(token)])
      .then(([remoteUserData, remoteCardsData]) => {
        setUserInfo(remoteUserData);
        setCardsList(remoteCardsData);
      })
      .then(() => {
        setContentIsLoaded(true);
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function handleAvatarSubmit(inputValue) {
    api
      .setAvatar(inputValue, token)
      .then((remoteUserData) => {
        setUserInfo(remoteUserData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function handleUserInfoSubmit(inputValues) {
    api
      .setUserInfo(inputValues, token)
      .then((remoteUserData) => {
        setUserInfo(remoteUserData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function handleNewPlaceSubmit(inputValues) {
    api
      .addCard(inputValues, token)
      .then((remoteCardsData) => {
        setCardsList([remoteCardsData, ...cardsList]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((liker) => liker === userInfo._id);
    api
      .toggleCardLike(card._id, isLiked, token)
      .then((newCard) => {
        setCardsList((state) => state.map((item) => (item._id === card._id ? newCard : item)));
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, token)
      .then(() => {
        setCardsList((newCardsList) => newCardsList.filter((item) => item._id !== card._id));
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        utils.requestErrorHandler(err);
      });
  }

  function handleRegister(credentials) {
    return auth
      .register(credentials)
      .then(() => {
        showTooltip('success');
      })
      .catch((err) => {
        showTooltip('error');
        utils.requestErrorHandler(err);
      });
  }

  function handleLogin(credentials) {
    return auth
      .authorize(credentials)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res);
          setIsLoggedIn(true); // triggers redirect in useEffect
          navigate(consts.paths.root);
        }
      })
      .catch((err) => {
        showTooltip('error');
        utils.requestErrorHandler(err);
      });
  }

  // eslint-disable-next-line consistent-return
  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return null;
    }
    auth
      .getUserInfo(jwt)
      .then((res) => res.json())
      .then(({ data }) => {
        setUserData(data);
        setIsLoggedIn(true); // triggers redirect in useEffect
      })
      .catch((err) => {
        setIsLoggedIn(false);
        utils.requestErrorHandler(err);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate(consts.paths.root);
      getAllData();
    }
    checkToken();
  }, [isLoggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ userData, userInfo, isLoggedIn }}>
      <div className="page">
        <Header onLogout={handleLogout} />
        <Routes>
          <Route element={<ProtectedRoutes redirectTo={consts.paths.login} />}>
            <Route path={consts.paths.any} />

            <Route
              exact
              path={consts.paths.root}
              element={(
                <Main
                  contentIsLoaded={contentIsLoaded}
                  // page buttons
                  oneditAvatar={openEditAvatarPopup}
                  onEditProfile={openEditProfilePopup}
                  onAddCard={openNewCardPopup}
                  // cards
                  cardComponent={<Card />}
                  cardsList={cardsList}
                  onCardLike={handleCardLike}
                  onCardThumbClick={openImageViewPopup}
                  onDeleteButtonClick={openConfirmDeletePopup}
                />
              )}
            />
          </Route>

          {/* PUBLIC ROUTES */}
          <Route
            path={consts.paths.register}
            element={<Register onSubmit={handleRegister} />}
          />
          <Route path={consts.paths.login} element={<Login onSubmit={handleLogin} />} />
        </Routes>
        <Footer />
        <Popups
          isOpen={isOpen}
          selectedCard={selectedCard}
          tooltipType={tooltipType}
          // handlers
          onTooltipClose={handleTooltipClose}
          clearSelectedCard={clearSelectedCard}
          onSubmitAvatar={handleAvatarSubmit}
          onSubmitUser={handleUserInfoSubmit}
          onSubmitNewPlace={handleNewPlaceSubmit}
          onSubmitCardDelete={handleCardDelete}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
