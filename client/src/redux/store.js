import { configureStore } from '@reduxjs/toolkit';
import activityReducer from './activityslice';

const store = configureStore({
    reducer: {
        activities: activityReducer, 
    },
});

export default store;
