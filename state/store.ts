import { configureStore } from '@reduxjs/toolkit';
import trackerReducer from '../slices/trackerSlice';
import authReducer from '../slices/authSlice';
import locationReducer from '../slices/locationSlice';
import selectedTrackerReducer from '../slices/selectedTrackerSlice';
import { TypedUseSelectorHook, useDispatch as reduxUseDispatch, useSelector as reduxUseSelector  } from 'react-redux';

export const store = configureStore({
    reducer: {
        trackers: trackerReducer,
        auth: authReducer,
        location: locationReducer,
        selectedTracker: selectedTrackerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;