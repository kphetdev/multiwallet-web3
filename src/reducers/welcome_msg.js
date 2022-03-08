const welcome_msg = (state = '', action) => {

    switch (action.type) {
        case 'SET_WELCOME_MSG_SUCCESS':
            return action.payload.msg
        default:
            return state
    }

}

export default welcome_msg
