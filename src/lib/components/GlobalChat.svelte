<script lang="ts">

    import {Button} from "$lib/components/ui/button";
    import {Label} from "$lib/components/ui/label";
    import {Input} from "$lib/components/ui/input";
    import * as Sheet from "$lib/components/ui/sheet";
    import {messages, roomManager, socket} from "../../routes/rooms/ClientRoomManager";
    import ParticipantItem from "$lib/components/ParticipantItem.svelte";
    import Message from "$lib/components/Message.svelte"
    import {Track} from "livekit-client";
    let chat: string;


    function send(){
        if(!chat || chat==="")return;
        const time = new Date().toLocaleTimeString().substring(0,4);
        socket.emit('chat', roomManager.meetingId, roomManager.name, chat, time);
        new Message({
            target: document.querySelector("#global-chat") as HTMLElement,
            props:{
                local: true,
                participant: roomManager.name,
                time: time,
                message: chat
            }
        });

        chat="";
    }

</script>

<Sheet.Header>
    <Sheet.Title>Global Chat</Sheet.Title>
    <Sheet.Description>
        Chat with the participants
    </Sheet.Description>
</Sheet.Header>
<div class="flex-row pt-5">
    <div class="message-area h-[80vh] overflow-y-auto overflow-x-hidden flex-row " id="global-chat">

        {#each Array.from(messages) as message}
            <Message participant={message.name} message={message.message} time={message.time} local={message.local}/>
        {/each}

    </div>
    <form class="flex w-full h-[10vh] items-center space-x-2" on:submit|preventDefault={send}>
        <Input type="text" placeholder="message" bind:value={chat}/>
        <Button on:click={send}>Send</Button>
    </form>
</div>
<Sheet.Footer>
    <!--    <Sheet.Close asChild let:builder>-->
    <!--        <Button builders={[builder]} type="submit">Save changes</Button>-->
    <!--    </Sheet.Close>-->
</Sheet.Footer>


<style>

    .message-area{
        scrollbar-width: none;
    }

</style>