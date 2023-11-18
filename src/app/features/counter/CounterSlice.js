import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  n: 0,
  r: 0,
  permutationResult:0,
  ncount: 0,
  rcount: 0,
  count: 0,
  kchar:"",
  rSet:"",
  isClicked: false,
  inserted_id:'',
  arrayLen: 0,
  active: true
}

export const counterSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    assignSetN: (state, action) => {
      state.n = action.payload
    },
    assignKchar: (state, action) => {
      state.kchar = action.payload
    },
    assignSetR: (state, action) => {
      state.r = action.payload
    },
    assignPermutationResult: (state, action) => {
        state.permutationResult = action.payload
    },
    assignNCount: (state, action) => {
      state.ncount = action.payload
    },
    assignRCount: (state, action) =>{
      state.rcount = action.payload
    },
    assignrSet: (state, action) => {
      state.rSet = action.payload
    },
    assignIsClicked: (state, action) => {
      state.isClicked = action.payload
    },
    assignInsertedId: (state, action) =>{
      state.inserted_id = action.payload
    },
    assignCount: (state, action) =>{
      state.count = action.payload
    },
    assignArrayLen: (state, action) =>{
      state.arrayLen = action.payload
    },
    assignActive: (state, action) =>{
      state.active = action.payload
    },
    resetN: (state) => {
      state.n = 0
    },
    resetR: (state) => {
      state.r = 0
    },
    resetRCount: (state) =>{
      state.rcount =0
    },
    resetPermutationResult: (state) => {
        state.permutationResult = 0
      },
    resetNCount: (state) => {
      state.ncount = 0
    },
    resetKchar: (state) => {
      state.kchar = ""
    },
    resetrSet: (state) => {
      state.rSet =""
    },
    resetIsClicked: (state) => {
      state.isClicked = true
    },
    resetInsertedId: (state) => {
      state.inserted_id =""
    },
    resetCount: (state) => {
      state.count = 0
    },
    resetArrayLen: (state) => {
      state.arrayLen = 0
    },
    resetActive: (state) => {
      state.active = false
    }
  }
})

export const { assignSetN, assignSetR, assignPermutationResult, assignNCount, assignKchar, assignrSet, assignRCount, assignIsClicked, assignInsertedId, assignArrayLen, assignCount, assignActive, resetKchar, resetN, resetR, resetPermutationResult, resetNCount, resetrSet, resetRCount, resetIsClicked, resetInsertedId, resetCount, resetArrayLen, resetActive } = counterSlice.actions
export default counterSlice.reducer
