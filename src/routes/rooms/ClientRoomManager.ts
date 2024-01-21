import ParticipantVideo from "$lib/components/ParticipantVideo.svelte";
import ParticipantItem from "$lib/components/ParticipantItem.svelte";
import {Room, RoomEvent, VideoPresets} from "livekit-client";
import {
    handleActiveSpeakerChange,
    handleDisconnect, handleLocalTrackUnpublished, handleParticipantConnected,
    handleTrackSubscribed,
    handleTrackUnsubscribed
} from "./ClientRoomListeners";

class ClientRoomManager{

    participantVideoItems: Map<string, ParticipantVideo>;
    participantItems: Map<string, ParticipantItem>;
    room: Room;
    sfuIp: string;
    backendIp: string;
    token: string;
    meetingId: string;
    name: string;

    constructor(meetingID: string, name: string) {
        this.token = "";
        this.sfuIp = "ws://127.0.0.1:7880";
        this.backendIp = "";
        this.participantItems = new Map();
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
    }

    async fetchToken(){
        const body = {name: this.name, meetingID: this.meetingId};
        const response = await fetch(`${this.backendIp}/create`, {
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
        this.room.prepareConnection(this.sfuIp, this.token);
        this.room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
            .on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
            .on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakerChange)
            .on(RoomEvent.Disconnected, handleDisconnect)
            .on(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished)
            .on(RoomEvent.ParticipantConnected, handleParticipantConnected)


    }








}