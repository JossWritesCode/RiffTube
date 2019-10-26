import { GOOGLE_USER_SIGNIN } from '../actions';

const initialState = {
  videoID: 'tgbNymZ7vqY',
  googleUser: null
};

<<<<<<< HEAD
export default (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_USER_SIGNIN:
      return {
        ...state,
        googleUser: action.payload
      };
    default:
      return state;
  }
};
||||||| merged common ancestors
export default (state = initialState, action) =>
    {
        switch (action.type)
        {
            case GOOGLE_USER_SIGNIN:
                debugger;
                return {
                    ...state,
                    googleUser: action.payload
                };
            default:
            return state;
        }
    };
=======
export default (state = initialState, action) =>
    {
        switch (action.type)
        {
            case GOOGLE_USER_SIGNIN:
                return (
                    {
                        ...state,
                        googleUser: action.payload
                    }
                );
            default:
                return state;
        }
    };
>>>>>>> 1588a023a56cb7d6138b7440187e6d8ad223874f
