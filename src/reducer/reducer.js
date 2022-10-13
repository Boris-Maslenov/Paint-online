const initialState = {
    tool: null,
    canvas: null,
    color: '#000',
    width: '1px',
    undoList: [],
    redoList: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATE_CANVAS' :
        return {
            ...state,
            canvas: action.payload
        }
        case 'SET_TOOL' :
            const newColorTool = action.payload;
            newColorTool.setFillColor = state.color;
            return {
                ...state,
                tool: newColorTool
            }
        case 'SET_COLOR' :
            const newColor = state.tool;
            newColor.setFillColor = action.payload;
            return {
                ...state,
                color:  action.payload,
            }
        case 'SET_WIDTH' :
            const newWidthTool = state.tool;
            newWidthTool.setWidth = action.payload;
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

        default: return state   
    }
    
}

export default reducer;