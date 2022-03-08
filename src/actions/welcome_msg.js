const setWelcomeMsgSuccess = msg => ({
    type: 'SET_WELCOME_MSG_SUCCESS',
    payload: {
        msg
    }
})

export const setWelcomeMsg = (msg) => ((dispatch) => {
    dispatch(setWelcomeMsgSuccess(msg))
})
