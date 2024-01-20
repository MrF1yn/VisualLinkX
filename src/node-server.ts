import { handler } from '../build/handler.js';
import { AccessToken } from 'livekit-server-sdk';
import express from 'express';
import multer from 'multer';

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
    });
    at.addGrant({ roomJoin: true, room: roomName });

    return {"token": at.toJwt()};
}

app.post("/create", (req, res)=>{
    console.log(req.body);
    res.send(createToken("test", req.body.name))
});



// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);
app.listen(3000, () => {
    console.log('listening on port 3000');
});
