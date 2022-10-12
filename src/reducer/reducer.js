const initialState = {
    tool: 'brush',
    canvas: null,

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATE_CANVAS' :
        return {
            ...state,
            canvas: action.payload
        }
            default: return state
    }
}

export default reducer;

