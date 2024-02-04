import { handler } from '../build/handler.js';
import {AccessToken, WebhookReceiver} from 'livekit-server-sdk';
import express from 'express';
import multer from 'multer';
import { RoomServiceClient, Room } from 'livekit-server-sdk';

const sfuIP = '127.0.0.1:7880';
const roomService = new RoomServiceClient(`https://${sfuIP}`, 'devkey', 'secret');
const receiver = new WebhookReceiver("devkey", "secret");
const roomIDs = new Map<string, string>(); //roomID, Owner
// const roomIDMap = new Map<string, string>(); //roomID, Owner



let upload = multer();
let app = express();
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array(''));
app.use(express.static('public'));


function createToken(roomName: string, participantName: string){

    const at = new AccessToken('devkey', 'secret', {
        identity: participantName,
        name: participantName
    });
    at.addGrant({ roomJoin: true, room: roomName });

    return {"token": at.toJwt()};
}

app.post("/create-token", (req, res)=>{
    console.log(req.body);
    const participantID = req.body.name?.replaceAll(" ", "-");
    const meetingID = req.body.meetingID;
    if(!participantID){
        res.send({"token": "Invalid Participant id"});
        return;
    }
    if(!roomIDs.has(meetingID)){
        res.send({"token": "invalid meeting id"});
        return;
    }




    res.send(createToken(meetingID, participantID));
});

app.post("/create-id", (req, res) => {
    let uuid = crypto.randomUUID();
    const participantID = req.body.name?.replaceAll(" ", "-");
    if(!participantID){
        res.send({"token": "Invalid Participant id"});
        return;
    }
    while (roomIDs.has(uuid)){
        uuid = crypto.randomUUID();
    }
    roomIDs.set(uuid, participantID);

    res.status(200);
    res.send({meetingID: uuid})
});
app.post("/validate-id", (req, res) => {
    if(roomIDs.has(req.body.meetingID)){
        res.status(200);
        res.send({status: "valid"});
        return;
    }
    res.status(411);
    res.send({status: "invalid"});
});
app.post("/mute-unmute-track", (req, res) => {
    const meetingID: string = req.body.meetingID;
    const ownerID: string = req.body.ownerID;
    const participantID: string = req.body.participantID;
    const trackSid: string = req.body.trackSid;
    const muted: boolean = req.body.muted;

    if (!roomIDs.has(meetingID)) {
        res.status(411);
        res.send({reason: "Invalid Meeting id"});
        return;
    }


    if(!(ownerID && trackSid && participantID)){
        res.status(411);
        res.send({status: "invalid"});
        return;
    }
    if(roomIDs.get(meetingID) !== ownerID){
        res.status(411);
        res.send({status: "You are not the owner of the meeting."});
        return;
    }

    roomService.mutePublishedTrack(meetingID, participantID, trackSid, muted);
    res.status(200);
    res.send({status: "success"});



});


app.post("/sfu-webhook", (req, res)=>{

    const event = receiver.receive(req.body, req.get('Authorization'))
    switch (event.event){

        case "room_finished":
            roomIDs.delete(event.room?.name as string);
            break;
        case "room_started":
            roomIDs.set(event.room?.name as string, "");

    }

});



// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);
app.listen(3000, () => {
    console.log('listening on port 3000');
});
