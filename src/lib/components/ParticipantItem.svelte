<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import {type Participant, ParticipantEvent, type Room} from "livekit-client";
    import {onMount, type SvelteComponent} from "svelte";
    import ParticipantVideo from "$lib/components/ParticipantVideo.svelte";
    import {Button} from "$lib/components/ui/button";
    import {faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash} from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome";
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

    function onMicButtonClick(){

    }

    function onVideoButtonClick() {

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

