import {
    DisconnectReason, type LocalParticipant, type LocalTrackPublication,
    type Participant, ParticipantEvent,
    RemoteParticipant,
    RemoteTrack,
    RemoteTrackPublication, Track
} from "livekit-client";
import ParticipantVideo from "$lib/components/ParticipantVideo.svelte";
import ParticipantItem from "$lib/components/ParticipantItem.svelte";
import {toast} from "svelte-sonner";
import {roomManager} from "./ClientRoomManager";

export function handleTrackSubscribed(track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant){
    if (track.kind === Track.Kind.Video || track.kind === Track.Kind.Audio) {
        participantConnected(participant);
        if(track.kind == Track.Kind.Video) {
            let vidElm: ParticipantVideo = new ParticipantVideo({
                target: document.querySelector("#participant-videos") as HTMLElement,
                props: {
                    ide: participant.sid,
                    track: track
                }
            });
            roomManager.participantVideoItems.set(participant.sid, vidElm);

        }
    }
}

export function handleTrackUnsubscribed(track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) {
    track.detach();
}

export function handleActiveSpeakerChange(speakers: Participant[]) {

}

export function handleDisconnect(reason: DisconnectReason | undefined) {
    console.log('disconnected from room');
}

export function handleLocalTrackUnpublished(publication: LocalTrackPublication, participant: LocalParticipant) {
    if(!publication.track)return;
    publication.track.detach();
}

export function handleParticipantConnected(participant: RemoteParticipant) {
    participantConnected(participant);
}

function participantConnected(participant: RemoteParticipant){
    if(roomManager.participantItems.has(participant.sid))return;
    let card = new ParticipantItem({
        target: document.querySelector("#participants") as HTMLElement,
        props: {
            participantName: participant.name
        }
    });
    roomManager.participantItems.set(participant.sid, card);

    participant.on(ParticipantEvent.IsSpeakingChanged, (speaking: boolean)=>{
        const participantItem = (roomManager.participantItems.get(participant.sid) as ParticipantItem);
        if(speaking)
            participantItem.activate();
        else
            participantItem.deActivate();
    });
    toast(`${participant.name} has joined the call!`, {
        description: "Sunday, December 03, 2023 at 9:00 AM",
    });
}

export function handleParticipantDisconnected(participant: RemoteParticipant) {
    roomManager.participantItems.get(participant.sid)?.$destroy();
    roomManager.participantVideoItems.get(participant.sid)?.$destroy();
    roomManager.participantItems.delete(participant.sid);
    roomManager.participantVideoItems.delete(participant.sid);
}