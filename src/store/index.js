import { configureStore } from "@reduxjs/toolkit";
import bill from './modules/bill.js';

export default configureStore({
  reducer: {
    bill,
  }
})