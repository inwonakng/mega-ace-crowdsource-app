import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name:'state',
    initialState:{
      isCollectionOpen: false,
      numDataCollected: -1,
      showDonationThanksModal: false, 
      submissionSuccess: false, 
      submissionError: false, 
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
        setSubmissionSuccess: (state, action) => {
          state.submissionSuccess = action.payload
        },
        setSubmissionError: (state, action) => {
          state.submissionError = action.payload
        }
    }

})

export const { 
  setIsCollectionOpen,
  setNumDataCollected,
  setShowDonationThanksModal,
  setSubmissionSuccess,
  setSubmissionError
} = stateSlice.actions
export default stateSlice.reducer