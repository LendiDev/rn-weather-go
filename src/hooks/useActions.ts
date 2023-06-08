import {bindActionCreators} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {actions as locationsActions} from '../store/slices/locations.slice';

const rootActions = {
  ...locationsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
