import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData, storeData, removeData } from '../utils/storage';
import { UserData } from '../types/user';

interface AuthState {
    userData: UserData | null;
}

export const loadUserData = createAsyncThunk<UserData | null>('auth/loadUserData', async () => {
    const storedUserData = await getData('user_data');
    return storedUserData as UserData | null;
});

export const login = createAsyncThunk<UserData, { userData: UserData  }>(
    'auth/login',
    async ({ userData }) => {
        await Promise.all([
            storeData({ key: 'user_data', value: userData }),
        ]);
        return userData;
    }
);

export const logout = createAsyncThunk<null>('auth/logout', async () => {
    await Promise.all([
        removeData('user_data'),
    ]);
    return null;
});

const initialState: AuthState = {
    userData: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadUserData.fulfilled, (state, action) => {
            state.userData = action.payload;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.userData = action.payload;
        })
        .addCase(logout.fulfilled, (state) => {
            state.userData = null;
        });
    },
});

export default authSlice.reducer;
