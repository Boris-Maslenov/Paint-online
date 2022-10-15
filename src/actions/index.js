export const setTool = (tool) => {
    return {
        type: 'SET_TOOL',
        payload: tool
    }
}
export const createCanvas = (ref) => {
    return {
        type: 'CREATE_CANVAS',
        payload: ref
    }
}

export const setFillColor = (color) => {
    return {
        type: 'SET_COLOR',
        payload: color
    }
}

export const setWidth = (width) => {
    return {
        type: 'SET_WIDTH',
        payload: width
    }
}
export const pushToUndo = (payload) => {
    return {
        type: 'PUSH_UNDO_LIST',
        payload
    }
}
export const pushToRedo = (payload) => {
    return {
        type: 'PUSH_REDO_LIST',
        payload
    }
}

export const setUserName = (payload) => {
    return {
        type: 'SET_USER_NAME',
        payload
    }
}

export const setSocket = (payload) => {
    return {
        type: 'SET_SOCKET',
        payload
    }
}

export const setSessionId = (payload) => {
    return {
        type: 'SET_SESSION_ID',
        payload
    }
}