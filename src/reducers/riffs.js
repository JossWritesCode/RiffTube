import
{
    ADD_RIFF
} from '../actions';

export default (state = [], action) =>
    {
        switch (action.type)
        {
            case ADD_RIFF:
                return (
                    {
                        ...state,
                        riffs: [ ...state.riffs, action.payload ]
                    }
                );
            default:
                return state;
        }
    };