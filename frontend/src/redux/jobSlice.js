import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: '',
        allAppliedJobs: [],
        searchQuery: '',
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
});

// Export actions
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchQuery,
} = jobSlice.actions;

// Default export for the reducer
export default jobSlice.reducer; // Change here





// const createSlice = require('@reduxjs/toolkit')

// const jobSlice = createSlice({
//     name: "job",
//     initialState: {
//         allJobs: [],
//         allAdminJobs: [],
//         singleJob: null,
//         searchJobByText: "",
//         allAppliedJobs: [],
//         searchQuery:"",
//     },
//     reducers: {
//         setAllJobs: (state, action) => {
//             state.allJobs = action.payload;
//         },
//         setSingleJob: (state, action) => {
//             state.singleJob = action.payload;
//         },
//         setAllAdminJobs: (state, action) => {
//             state.allAdminJobs = action.payload;
//         },
//         setSearchJobByText: (state, action) => {
//             state.searchJobByText = action.payload;
//         },
//         setAllAppliedJobs: (state, action) => {
//             state.allAppliedJobs = action.payload;
//         },
//         setSearchQuery: (state, action) => {
//             state.searchQuery = action.payload;
//         },
//     }
// })
// export const {
//     setAllJobs,
//     setSingleJob,
//     setAllAdminJobs,
//     setSearchJobByText,
//     setAllAppliedJobs,
//     setSearchQuery,
// } = jobSlice.actions;

// module.exports = {
//     jobSlice,
//     setAllJobs,
//     setSingleJob
// };