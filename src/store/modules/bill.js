import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
    addBill(state, action) {
      state.billList.push(action.payload);
    }
  }
})
const { setBillList, addBill } = billStore.actions;

export { setBillList, addBill };

const fetchBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:9999/ka');
    dispatch(setBillList(res.data));
  }
}

const fetchAddBillList = (data) => {
  return async (dispatch) => {
    const res = await axios.post('http://localhost:9999/ka', data);
    dispatch(addBill(res.data));
  }
}

export { fetchBillList, fetchAddBillList };


const reducers = billStore.reducer;
export default reducers;