import {combineReducers} from 'redux'
import welcome_msg from './welcome_msg'

export default combineReducers({
    sample_val: (state=0,action) => {
        return state
    },
    welcome_msg: welcome_msg
})
