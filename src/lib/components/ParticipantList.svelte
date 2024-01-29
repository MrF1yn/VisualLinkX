<script lang="ts">

    import {Button} from "$lib/components/ui/button";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
    import * as Sheet from "$lib/components/ui/sheet";
    import {roomManager} from "../../routes/rooms/ClientRoomManager";
    import ParticipantItem from "$lib/components/ParticipantItem.svelte";
</script>

<Sheet.Header>
    <Sheet.Title>Participants</Sheet.Title>
    <Sheet.Description>
        List of all participants currently in the meeting.
    </Sheet.Description>
</Sheet.Header>
    <div class="grid gap-4 py-4">
        {#key roomManager.room.localParticipant}
            <ParticipantItem participant={roomManager.room.localParticipant} room={roomManager.room}></ParticipantItem>
        {/key}
        {#each Array.from(roomManager.room.participants.values()) as participant}
            <ParticipantItem participant={participant} room={roomManager.room}></ParticipantItem>
        {/each}

    </div>
<Sheet.Footer>
    <!--    <Sheet.Close asChild let:builder>-->
    <!--        <Button builders={[builder]} type="submit">Save changes</Button>-->
    <!--    </Sheet.Close>-->
</Sheet.Footer>


<style>

</style>