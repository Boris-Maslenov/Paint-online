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