import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TrackerType, TrackerGeolocationType } from '../types/tracker';
import { generateRandomString } from '../utils/common';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const fetchTrackersByUserToken = createAsyncThunk<
    TrackerType[],
    { access_token: string },
    { rejectValue: string }
>(
    'trackers/fetchByUserToken',
    async ({ access_token }: { access_token: string }, { rejectWithValue }) => {
        if (!access_token) return rejectWithValue('Access_token variable is not filled');

        try {
            const trackersResponse = await axios.get<TrackerType[]>(`${apiUrl}/api/trackers/get-by-access-token`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            const trackers = trackersResponse.data;

            const enrichedTrackers: TrackerType[] = await Promise.all(trackers.map(async (tracker) => {
                const geoResponse = await axios.get<TrackerGeolocationType>(`${apiUrl}/api/geolocations/get-latest-by-tracker-token`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    },
                    params: {
                        tracker_token: tracker.token
                    }
                });
                tracker.latest_geolocation = geoResponse.data;
                return tracker;
            }));
            return enrichedTrackers;
        } 
        catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                return rejectWithValue(`${error.response?.data}`);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const fetchTrackerGeolocationsByUserToken = createAsyncThunk<
    TrackerType[],
    { access_token: string },
    { rejectValue: string }
>(
    'trackers/fetchGeolocationsByUserToken',
    async ({ access_token }: { access_token: string }, { rejectWithValue }) => {
        if (!access_token) return rejectWithValue('Access_token variable is not filled');

        try {
            const trackersResponse = await axios.get<TrackerType[]>(`${apiUrl}/api/trackers/get-by-access-token`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            const trackers = trackersResponse.data;

            const enrichedTrackers: TrackerType[] = await Promise.all(trackers.map(async (tracker) => {
                const geoResponse = await axios.get<TrackerGeolocationType[]>(`${apiUrl}/api/geolocations/get-by-tracker-token`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    },
                    params: {
                        tracker_token: tracker.token
                    }
                });
                tracker.geolocations = geoResponse.data;
                return tracker;
            }));

            return enrichedTrackers;
        } 
        catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                return rejectWithValue(`${error.response?.data}`);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const addTracker = createAsyncThunk<
    TrackerType,
    { tracker_name?: string; access_token: string; tracker_token: string },
    { rejectValue: string }
>(
    'trackers/addTracker',
    async ({ tracker_name, access_token, tracker_token }, { rejectWithValue }) => {
        if (!access_token || !tracker_token) {
            return rejectWithValue('Access or tracker token variables are not filled');
        }

        try {
            let trackerName = tracker_name;
            if (!trackerName) {
                trackerName = generateRandomString();
            }

            const trackerResponse = await axios.put<TrackerType>(
                `${apiUrl}/api/trackers/link-to-user`,
                {
                    token: tracker_token,
                    name: trackerName,
                    sim_phone_number: null
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }
            );

            const tracker = trackerResponse.data;
            if (typeof tracker === 'string') return rejectWithValue(tracker);

            const geoResponse = await axios.get<TrackerGeolocationType>(
                `${apiUrl}/api/geolocations/get-latest-by-tracker-token`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    },
                    params: {
                        tracker_token: tracker.token
                    }
                }
            );

            if (typeof geoResponse.data === 'string') return rejectWithValue(geoResponse.data);

            tracker.latest_geolocation = geoResponse.data;
            return tracker;
        } 
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(`${error.response.data}`);
            }

            return rejectWithValue('An unexpected error occurred');
        }
    }
);



interface TrackerState {
    trackers: TrackerType[];
    loading: boolean;
    error: string | null | undefined;
}

const initialState: TrackerState = {
    trackers: [],
    loading: false,
    error: null
};

const trackerSlice = createSlice({
    name: 'trackers',
    initialState,
    reducers: {
        resetTrackers(state) {
            state.trackers = [];
            state.loading = false;
            state.error = null;
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrackersByUserToken.pending, (state) => {
            state.loading = state.trackers.length === 0;
            state.error = null;
        });
        builder.addCase(fetchTrackersByUserToken.fulfilled, (state, action) => {
            const updatedTrackers = action.payload.map(newTracker => {
                const existingTracker = state.trackers.find(t => t.token === newTracker.token);
                return existingTracker
                    ? { ...existingTracker, ...newTracker }
                    : newTracker;
            });
            state.trackers = updatedTrackers;
            state.loading = false;
        });
        builder.addCase(fetchTrackersByUserToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(addTracker.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addTracker.fulfilled, (state, action) => {
            const existingTrackerIndex = state.trackers.findIndex(t => t.token === action.payload.token);
            if (existingTrackerIndex !== -1) {
                state.trackers[existingTrackerIndex] = action.payload;
            } else {
                state.trackers.push(action.payload);
            }
            state.loading = false;
        });
        builder.addCase(addTracker.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchTrackerGeolocationsByUserToken.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTrackerGeolocationsByUserToken.fulfilled, (state, action) => {
            const updatedTrackers = action.payload.map(newTracker => {
                const existingTracker = state.trackers.find(t => t.token === newTracker.token);
                return existingTracker
                    ? { ...existingTracker, geolocations: newTracker.geolocations }
                    : newTracker;
            });
            state.trackers = updatedTrackers;
            state.loading = false;
        });
        builder.addCase(fetchTrackerGeolocationsByUserToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});


export const { resetTrackers, clearError } = trackerSlice.actions;
export default trackerSlice.reducer;