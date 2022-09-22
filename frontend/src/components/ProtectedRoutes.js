import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Navigate, Outlet } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUserContext';
// import Preloader from './Preloader.js';

const ProtectedRoutes = (props) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return isLoggedIn ? <Outlet /> : <Navigate to={props.redirectTo} />;
};

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
  redirectTo: PropTypes.string,
};
