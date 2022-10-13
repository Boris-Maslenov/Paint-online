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