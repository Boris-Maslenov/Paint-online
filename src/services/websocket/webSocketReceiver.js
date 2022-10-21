import { toolsFactory } from "../toolsFactory";

export class WebSocketReceiver {
    static recive(msg, canvas){
        toolsFactory.init(msg, canvas);
    }
}