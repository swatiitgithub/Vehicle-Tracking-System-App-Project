import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageSession from 'redux-persist/lib/storage/session'
import rootSaga from './saga/saga';
import complaintSlice from './slices/complaintSlice';
import userSlice from './slices/userSlice';
import sideMenuSlice from './slices/sideMenuSlice';
import locationSlice from './slices/locationSlice';
import languageSlice from './slices/languageSlice';
import dashboardSlice from './slices/dashboardSlice';
import themeSlice from './slices/themeSlice';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer: any = combineReducers({
    sideMenu: sideMenuSlice,
    user: userSlice,
    complaint: complaintSlice,
    location: locationSlice,
    language: languageSlice,
    dashboard: dashboardSlice,
    theme: themeSlice
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(middleware),
});


sagaMiddleware.run(rootSaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch