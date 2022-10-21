import {Brush, Rect, Elaser, Line, Circle} from '../tools';

const TOOLS_MAP = {
        'BRUSH' : Brush,
        'RECT' : Rect,
        'ELASER' : Elaser,
        'LINE' : Line,
        'CIRCLE' : Circle,
}

export class toolsFactory {
    static init(params, canvas){
        try {
            const {tool} = params; 
            TOOLS_MAP[tool].draw(params, canvas);
        } catch(e) {
            console.log('Инструмент не найден', e);
        }
    }
}

