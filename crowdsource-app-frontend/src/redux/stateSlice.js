import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name:'state',
    initialState:{
      isCollectionOpen: false,
      numDataCollected: -1,
      showDonationThanksModal: false, 

    },
    reducers: {
        setIsCollectionOpen: (state, action) => {
          state.isCollectionOpen = action.payload
        },
        setNumDataCollected: (state, action) => {
          state.numDataCollected = action.payload
        },
        setShowDonationThanksModal: (state, action) => {
          state.showDonationThanksModal= action.payload
        },
    }

})

export const { 
  setIsCollectionOpen,
  setNumDataCollected,
  setShowDonationThanksModal
} = stateSlice.actions
export default stateSlice.reducer