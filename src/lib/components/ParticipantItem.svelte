<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import {type Participant, ParticipantEvent, type Room, Track} from "livekit-client";
    import {onMount, type SvelteComponent} from "svelte";
    import ParticipantVideo from "$lib/components/ParticipantVideo.svelte";
    import {Button} from "$lib/components/ui/button";
    import {faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash} from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome";
    import {backendIp} from "../../routes/rooms/ClientRoomManager";
    export let participant: Participant;
    export let room: Room;
    let compRef: SvelteComponent;


    onMount(()=>{

        participant.on(ParticipantEvent.IsSpeakingChanged, (speaking: boolean)=>{
            if(speaking) {
                activate();
            }
            else {
                deActivate();
            }

        });

        room.on('participantDisconnected', (p)=>{
            if(p===participant)
                compRef.$destroy();

        })

    })

    let color = "bg-background";
    export function activate() {
        color = "bg-green-500";
    }

    export function deActivate() {
        color = "bg-background";
    }

   async function onMicButtonClick(){

        const trackSid = participant.getTrack(Track.Source.Microphone)?.trackSid;
        const identity = participant.identity;
        const meetingID = room.name;
        const ownerID = room.localParticipant.identity;
        const muted = !participant.isMicrophoneEnabled;

        const response = await fetch(`${backendIp}/mute-unmute-track`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({meetingID: meetingID,
            ownerID: ownerID, participantID: identity,
            trackSid: trackSid, muted: muted})
        });

        console.log(response);


    }

   async function onVideoButtonClick() {

        const trackSid = participant.getTrack(Track.Source.Camera)?.trackSid;
        const identity = participant.identity;
        const meetingID = room.name;
        const ownerID = room.localParticipant.identity;
        const muted = !participant.isCameraEnabled;

        const response = await fetch(`${backendIp}/mute-unmute-track`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({meetingID: meetingID,
                ownerID: ownerID, participantID: identity,
                trackSid: trackSid, muted: muted})
        });

        console.log(response);

    }

</script>


<Card.Root class="w-full p-2 {color} flex items-center justify-between" bind:this={compRef}>
    {participant.name}
    <Button variant="ghost" class="ml-auto" on:click={onMicButtonClick}>
        <Icon data={participant.isMicrophoneEnabled?faMicrophone:faMicrophoneSlash}  ></Icon>
    </Button>
    <Button variant="ghost" on:click={onVideoButtonClick}>
        <Icon data={participant.isCameraEnabled?faVideo:faVideoSlash}></Icon>
    </Button>
</Card.Root>

