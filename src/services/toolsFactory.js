import {Brush, Rect, Elaser, Line, Circle} from '../tools';

const TOOLS_MAP = {
        'BRUSH' : Brush,
        'RECT' : Rect,
        'ELASER' : Elaser,
        'LINE' : Line,
        'CIRCLE' : Circle,
}

export class toolsFactory {
    static init(params){
        try {
            const {type} = params; 
            TOOLS_MAP[type].draw(params);
        } catch(e) {
            console.log('Инструмент не найден', e);
        }
    }
}

