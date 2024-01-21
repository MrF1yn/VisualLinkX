import {
    DisconnectReason, type LocalParticipant, type LocalTrackPublication,
    type Participant,
    RemoteParticipant,
    RemoteTrack,
    RemoteTrackPublication
} from "livekit-client";

export function handleTrackSubscribed(track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant){

}

export function handleTrackUnsubscribed(track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) {

}

export function handleActiveSpeakerChange(speakers: Participant[]) {

}

export function handleDisconnect(reason: DisconnectReason | undefined) {

}

export function handleLocalTrackUnpublished(publication: LocalTrackPublication, participant: LocalParticipant) {

}

export function handleParticipantConnected(participant: RemoteParticipant) {

}