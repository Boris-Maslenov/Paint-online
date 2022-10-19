const express = require('express');
const app = express();
const WSServer = require('express-ws');
const cors = require('cors');

const WSS = WSServer(app);
const aWss = WSS.getWss(); //широковещательная рассылка
const PORT = process.env.PORT || 5000;
const fs = require('fs');
const path = require('path');
const replaceData = 'data:image/png;base64,';
app.use(cors());
app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb'}));

//слушаем входящие подключения
app.ws('/', (ws, req) => {
    console.log(`Подключение установлено`);
    //ws.send('Ты успешно подключился'); // Отправим сообщение на клиент
    
    //  принимаем сообщение с клиента
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        
        switch(msg.method){
            case 'connection' : 
            connectionHandler(ws, msg);
            break;
            case 'draw' : 
            broadcastConnection(ws, msg);
            break;
        }
    });
});

// Слушает PORT
app.listen(PORT, () => {
    console.log(`Сервер успешно запушен на ${PORT} порту`);
});


const connectionHandler = (ws, msg) => {
   ws.id = msg.id;
   broadcastConnection(ws, msg);
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id === msg.id){
           //client.send(`Пользователь ${msg.username} подключился`); 
           client.send(JSON.stringify(msg)); 
        }
    });
}

app.post('/image', (req, res) => {
    try{
        const data = req.body.img.replace(replaceData, '');
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64');
        return res.status(200).json({message : "Успешно загружено"})
    } catch(e) {
        return res.status(500).json('error');
    }
});
app.get('/image', (req, res) => {
    try{
        const file =  fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`));
        return res.json( {data: replaceData + file.toString('base64') } );

    } catch(e) {
        console.log(e);
        return res.status(500).json('error');
    }
});
