import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrackerData {
	selectedTrackerId: number;
	selectedTrackerName: string;
	selectedTrackerCoordinates: string;
}

const initialState: TrackerData = {
	selectedTrackerId: 0,
	selectedTrackerName: '',
	selectedTrackerCoordinates: '',
};

export const selectedTrackerSlice = createSlice({
	name: 'selectedTracker',
	initialState,
	reducers: {
		setSelectedTracker(state, action: PayloadAction<TrackerData>) {
			const { selectedTrackerId, selectedTrackerName, selectedTrackerCoordinates } = action.payload;
			state.selectedTrackerId = selectedTrackerId;
			state.selectedTrackerName = selectedTrackerName;
			state.selectedTrackerCoordinates = selectedTrackerCoordinates;
		},
		resetSelectedTracker(state) {
			state.selectedTrackerId = 0;
			state.selectedTrackerName = '';
			state.selectedTrackerCoordinates = '';
		}
	},
});

export const { setSelectedTracker, resetSelectedTracker } = selectedTrackerSlice.actions;

export default selectedTrackerSlice.reducer;
