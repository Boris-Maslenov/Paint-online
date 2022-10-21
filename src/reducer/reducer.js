const initialState = {
    tool: 'BRUSH',
    canvas: null,
    color: '#000',
    width: '1px',
    undoList: [],
    redoList: [],
    userName: '',
    socket: new WebSocket('ws://localhost:5000'),
    sessionId: null,
    userId: null,
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
        case 'SET_COLOR' :
            return {
                ...state,
                color:  action.payload,
            }

        case 'SET_WIDTH' :
            return {
                ...state,
                width: action.payload,
            }
        case 'PUSH_UNDO_LIST' :
            return {
                ...state,
                undoList: [...state.undoList, action.payload]
            }

        case 'PUSH_REDO_LIST' :
            return {
                ...state,
                redoList: [...state.redoList, action.payload]
            }

        case 'SET_USER_NAME' :
            return {
                ...state,
                userName: action.payload
            }

        case 'SET_SOCKET' :
            return {
                ...state,
                socket: action.payload
            }
        case 'SET_SESSION_ID' :
            return {
                ...state,
                sessionId: action.payload
            }
        case 'SET_USER_ID' :
            return {
                ...state,
                userId: action.payload
            }
        default: return state   
    }
    
}

export default reducer;