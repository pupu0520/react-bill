import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: [1],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    }
  }
})
const { setBillList } = billStore.actions;

export { setBillList };

const fetchBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:9999/ka');
    dispatch(setBillList(res.data));
  }
}

export { fetchBillList };


const reducers = billStore.reducer;
export default reducers;