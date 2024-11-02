import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/slice"; // Ensure this is a default export
import jobSlice from "../redux/jobSlice"; // Ensure this is a default export
import companySlice from "../redux/companySlice"; // Now a default export
import applicationSlice from "./applicationSlice"; // Ensure this is a default export
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;



// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authSlice from "../redux/slice"
// import jobSlice from "../redux/jobSlice";
// import companySlice from "../redux/companySlice";
// // import { configureStore } from '@reduxjs/toolkit'
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import applicationSlice from "./applicationSlice";

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// }

// const rootReducer = combineReducers({
//     auth: authSlice,
//     job: jobSlice,
//     company: companySlice,
//     application: applicationSlice,
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// })

// export default store;