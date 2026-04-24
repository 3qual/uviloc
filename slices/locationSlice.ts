import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as Location from 'expo-location';
import { CoordinatesType } from '../types/coordinates';

export const fetchUserLocation = createAsyncThunk<
    CoordinatesType,
    void,
    { rejectValue: string }
>(
    'location/fetchUserLocation',
    async (_, { rejectWithValue }) => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return rejectWithValue('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({ accuracy: Location.LocationAccuracy.BestForNavigation });
            return { latitude: location.coords.latitude, longitude: location.coords.longitude };
        } 
        catch (error) {
            console.log(error);
            return rejectWithValue('Failed to fetch user location');
        }
    }
);

export const setUserLocation = createAsyncThunk<
    CoordinatesType,
    CoordinatesType,
    { rejectValue: string }
>(
    'location/setUserLocation',
    async (userLocation: CoordinatesType, { rejectWithValue }) => {
        try {
            return userLocation;
        } catch (error) {
            console.log(error);
            return rejectWithValue('Failed to set user location');
        }
    }
);


interface LocationState {
    userLocation: CoordinatesType | null;
    loading: boolean;
    error: string | null | undefined;
}

const initialState: LocationState = {
    userLocation: null,
    loading: false,
    error: null
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserLocation.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserLocation.fulfilled, (state, action) => {
            state.loading = false;
            state.userLocation = action.payload;
        })
        .addCase(fetchUserLocation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(setUserLocation.fulfilled, (state, action) => {
            state.loading = false;
            state.userLocation = action.payload;
        })
        .addCase(setUserLocation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default locationSlice.reducer;
