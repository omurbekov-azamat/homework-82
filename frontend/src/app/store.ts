import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../features/artists/artistsSlice";
import {albumsReducer} from "../features/albums/albumsSlice";
import {tracksReducer} from "../features/tracks/tracksSlice";
import {usersReducer} from "../features/user/userSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import {trackHistoriesReducer} from "../features/trackHistrories/trackHistoriesSlice";

const usersPersistConfig = {
    key: 'spotify:users',
    storage,
    whitelist: ['user'],
}

const rootReducer = combineReducers({
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: persistReducer(usersPersistConfig, usersReducer),
    trackHistories: trackHistoriesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;