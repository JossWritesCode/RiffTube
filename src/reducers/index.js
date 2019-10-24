
import
{
    GOOGLE_USER_SIGNIN
} from '../actions';
  
const initialState = {
    videoID: "tgbNymZ7vqY",
    googleUser: null
};

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