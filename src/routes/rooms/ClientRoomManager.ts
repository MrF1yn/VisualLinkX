import ParticipantVideo from "$lib/components/ParticipantVideo.svelte";
import ParticipantItem from "$lib/components/ParticipantItem.svelte";
import {Room, RoomEvent, VideoPresets} from "livekit-client";
import {io, Socket} from "socket.io-client";
import {
    handleDisconnect,
    handleLocalConnected,
    handleLocalTrackUnpublished,
    handleParticipantConnected,
    handleParticipantDisconnected,
    handleTrackSubscribed,
    handleTrackUnsubscribed
} from "./ClientRoomListeners";
import {goto} from "$app/navigation";
import {toast} from "svelte-sonner";
// import * as url from "url";
import {page} from "$app/stores";
import Message from "$lib/components/Message.svelte";

export let roomManager: ClientRoomManager;
export let socket: Socket;
export const sfuIp = "ws://127.0.0.1:7880";
export const backendIp = "http://localhost:3000";
export const backendSocketIp = "ws://localhost:3000";

export let messages = new Array<any>();
export class ClientRoomManager{

    participantVideoItems: Map<string, ParticipantVideo>;
    // participantItems: Map<string, ParticipantItem>;
    room: Room;
    token: string;
    meetingId: string;
    name: string;

    constructor(meetingID: string, name: string) {
        this.token = "";

        // this.participantItems = new Map();
        this.participantVideoItems = new Map();
        this.meetingId = meetingID;
        this.name = name;
        this.room = new Room({
            // automatically manage subscribed video quality
            adaptiveStream: true,

            // optimize publishing bandwidth and CPU for published tracks
            dynacast: true,

            // default capture settings
            videoCaptureDefaults: {
                resolution: VideoPresets.h720.resolution,
            },
        });
        roomManager = this;
    }

    async fetchToken(){
        const body = {name: this.name, meetingID: this.meetingId};
        const response = await fetch(`${backendIp}/create-token`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        });
        this.token = (await response.json()).token;
    }

    async init(){
        await this.fetchToken();
        if(this.token === "invalid meeting id") {
            toast('Failed to Join Meeting!', {
                description: "Invalid Meeting id."
            });
            let path:any;
            page.subscribe((n)=>{
                path = n.url;
            });
            goto(window.location.origin);

            return;
        }
        this.room.prepareConnection(sfuIp, this.token);
        this.room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
            .on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
            .on(RoomEvent.Disconnected, handleDisconnect)
            .on(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished)
            .on(RoomEvent.ParticipantConnected, handleParticipantConnected)
            .on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected)
            .on(RoomEvent.Connected, handleLocalConnected)
        await this.room.connect(sfuIp, this.token);

        console.log('connected to room', this.room.name);
        socket = io(backendSocketIp, {
            reconnectionDelayMax: 10000,
        });

        socket.on('connect', () => {
            console.log("Connected Socket");
        });

        socket.on('chat', (roomID, name, message, time)=>{
            messages.push(
                {
                    roomID: roomID,
                    name: name,
                    message: message,
                    time: time,
                    local: (name === this.name)
                });
            if(name === this.name)return;
            if(roomID !== this.meetingId)return;
            new Message({
                target: document.querySelector("#global-chat") as HTMLElement,
                props:{
                    local: false,
                    participant: name,
                    time: time,
                    message: message
                }
            })
        });


        await this.room.localParticipant.enableCameraAndMicrophone();

    }








}