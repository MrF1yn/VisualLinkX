<script lang="ts">

    import {Button} from "$lib/components/ui/button";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
    import * as Sheet from "$lib/components/ui/sheet";
    import {roomManager} from "../../routes/rooms/ClientRoomManager";
    import ParticipantItem from "$lib/components/ParticipantItem.svelte";
</script>

<Sheet.Header>
    <Sheet.Title>Global Chat</Sheet.Title>
    <Sheet.Description>
        Chat with the participants
    </Sheet.Description>
</Sheet.Header>
<div class="flex-row ">
    <div class="grid gap-4 py-4">

    </div>
    <form class="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="message"/>
        <Button type="submit">Send</Button>
    </form>
</div>
<Sheet.Footer>
    <!--    <Sheet.Close asChild let:builder>-->
    <!--        <Button builders={[builder]} type="submit">Save changes</Button>-->
    <!--    </Sheet.Close>-->
</Sheet.Footer>


<style>


</style>