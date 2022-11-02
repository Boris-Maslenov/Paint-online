export const saveBackupCanvas = (req, url, payload) => () => {
    req( url , 'POST', payload)
    .then(response => console.log(response))
    .catch(e =>  console.log(e))
}

export const setTool = (payload) => {
    return {
        type: 'SET_TOOL',
        payload
    }
}

export const createCanvas = (payload) => {
    return {
        type: 'CREATE_CANVAS',
        payload
    }
}

export const setColor = (payload) => {
    return {
        type: 'SET_COLOR',
        payload
    }
}

export const setWidth = (payload) => {
    return {
        type: 'SET_WIDTH',
        payload
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

export const setUserId = (payload) => {
    return {
        type: 'SET_USER_ID',
        payload
    }
}