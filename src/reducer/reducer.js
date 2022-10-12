const initialState = {
    tool: null,
    canvas: null,

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATE_CANVAS' :
        return {
            ...state,
            canvas: action.payload
        }
        case 'SET_TOOL' :
            return {
                ...state,
                tool: action.payload
            }
            default: return state
    }
}

export default reducer;

