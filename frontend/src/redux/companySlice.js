import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
    name: 'company',
    initialState: {
        singleCompany: null,
        companies: [],
        searchCompanyByText: '',
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },
    },
});

export const { setSingleCompany, setCompanies, setSearchCompanyByText } = companySlice.actions;

// Default export for the reducer
export default companySlice.reducer;




// const {createSlice} = require('@reduxjs/toolkit')

// const companySlice = createSlice({
//     name:"company",
//     initialState:{
//         singleCompany:null,
//         companies:[],
//         searchCompanyByText:"",
//     },
//     reducers:{
//         setSingleCompany:(state, action) => {
//             state.singleCompany = action.payload;
//         },
//         setCompanies: (state, action) => {
//             state.companies = action.payload;
//         },
//         setSearchCompanyByText: (state, action) => {
//             state.searchCompanyByText = action.payload;
//         },
//     }
// })

// export const { setSingleCompany, setCompanies, setSearchCompanyByText} = companySlice.actions;
// // export default = companySlice.reducer;
// module.exports = {
//     setSingleCompany
// }

