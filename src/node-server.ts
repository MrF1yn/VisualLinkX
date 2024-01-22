import { handler } from '../build/handler.js';
import {AccessToken, WebhookReceiver} from 'livekit-server-sdk';
import express from 'express';
import multer from 'multer';
import { RoomServiceClient, Room } from 'livekit-server-sdk';

const sfuIP = 'ws://127.0.0.1:7880';
const roomService = new RoomServiceClient(sfuIP, 'devkey', 'secret');
const receiver = new WebhookReceiver("devkey", "secret");
const roomIDs = new Set<string>();



let upload = multer();
let app = express();
let i:number = 0;
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array(''));
app.use(express.static('public'));


function createToken(roomName: string, participantName: string){

    const at = new AccessToken('devkey', 'secret', {
        identity: participantName.replaceAll(" ", "-"),
        name:participantName
    });
    at.addGrant({ roomJoin: true, room: roomName });

    return {"token": at.toJwt()};
}

app.post("/create-token", (req, res)=>{
    console.log(req.body);
    if(!roomIDs.has(req.body.meetingID)){
        res.send({"token": "invalid meeting id"});
        return;
    }
    res.send(createToken(req.body.meetingID, req.body.name))
});

app.get("/create-id", (req, res) => {
    let uuid = crypto.randomUUID();
    while (roomIDs.has(uuid)){
        uuid = crypto.randomUUID();
    }

    roomIDs.add(uuid);

    res.send({meetingID: uuid})
});


app.post("/sfu-webhook", (req, res)=>{

    const event = receiver.receive(req.body, req.get('Authorization'))
    switch (event.event){

        case "room_finished":
            roomIDs.delete(event.room?.name as string);
            break;
        case "room_started":
            roomIDs.add(event.room?.name as string);

    }

});



// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);
app.listen(3000, () => {
    console.log('listening on port 3000');
});
