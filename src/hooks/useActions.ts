import {bindActionCreators} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {actions as locationsActions} from '../store/locations/locations.slice';
import {locationsScreen} from '../store/screens/locationsScreen.slice';
import {homeScreenSlice} from '../store/screens/homeScreen.slice';

const rootActions = {
  ...locationsActions,
  ...locationsScreen.actions,
  ...homeScreenSlice.actions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
