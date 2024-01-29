<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import {type Participant, ParticipantEvent, type Room} from "livekit-client";
    import {onMount, type SvelteComponent} from "svelte";
    import ParticipantVideo from "$lib/components/ParticipantVideo.svelte";
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

    let color = "bg-accent";
    export function activate() {
        color = "bg-green-500";
    }

    export function deActivate() {
        color = "bg-accent";
    }

</script>


<Card.Root class="w-full p-2 {color} " bind:this={compRef}>
    {participant.name}
</Card.Root>

