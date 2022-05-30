import {
    SAVE_PIC_SUCCESS,
  } from '../actions/index.js';
  
  const acctImgKeyReducer = (state = 0, action) => {
    switch (action.type) {
      case SAVE_PIC_SUCCESS:
        return Date.now();
      default:
        return state;
    }
  };
  
  export default acctImgKeyReducer;
  