import
{
    ADD_RIFF
} from '../actions';

export default (state = [], action) =>
    {
        switch (action.type)
        {
            case ADD_RIFF:
                return [ ...state, {type: action.payload} ];
            default:
                return state;
        }
    };