<script lang="ts">

    import {Button} from "$lib/components/ui/button";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
    import * as Sheet from "$lib/components/ui/sheet";
    import {onMount} from "svelte";
    import {roomManager} from "../../routes/rooms/ClientRoomManager";
    import ParticipantItem from "$lib/components/ParticipantItem.svelte";


    let sec = new Map();
    sec.set('TEST', 'HELLO');


    let participants: string[] = [];
    $: if(roomManager.participantVideoItems){
        participants = Array.from(roomManager.participantVideoItems.keys());
    }
    // $: for(let participant of roomManager.room.participants.values()){
    //     let card = new ParticipantItem({
    //         target: document.getElementById("participants") as HTMLElement,
    //         props: {
    //                 participantName: participant.name
    //         }
    //     });
    //     roomManager.participantItems.set(participant.sid, card);
    // }
</script>

<Sheet.Header>
    <Sheet.Title>Participants</Sheet.Title>
    <Sheet.Description>
        List of all participants currently in the meeting.
    </Sheet.Description>
</Sheet.Header>
<div class="grid gap-4 py-4">
    <!--{#each participants as participant}-->
        <div class="border-white border-2">
            {participants.toLocaleString()}
        </div>
    <!--{/each}-->
</div>
<Sheet.Footer>
    <!--    <Sheet.Close asChild let:builder>-->
    <!--        <Button builders={[builder]} type="submit">Save changes</Button>-->
    <!--    </Sheet.Close>-->
</Sheet.Footer>


<style>

</style>