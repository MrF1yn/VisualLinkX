<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import { toast } from "svelte-sonner";
    import {onMount} from "svelte";
    import ParticipantItem from "$lib/components/ParticipantItem.svelte";
    import {page} from '$app/stores'
    import type {PageData} from './$types';
    import * as Card from "$lib/components/ui/card";
    import {ParticipantEvent, Track} from "livekit-client";

    import ParticipantVideo from "$lib/components/ParticipantVideo.svelte";
    import {ClientRoomManager} from "../ClientRoomManager";
    let participantItems = new Map();

    export let data: PageData;
    onMount(async ()=>{
        const name = $page.url.searchParams.get('name');
        const meetingID = (data as {meetingID: string}).meetingID;
        if(!name)return;
        const clientRoomManager = new ClientRoomManager(meetingID, name);
        await clientRoomManager.init();
        const p = clientRoomManager.room.localParticipant;


        const localVid = (document.querySelector("#local") as HTMLVideoElement );
        p.getTrack(Track.Source.Camera)?.track?.attach(localVid);

        let card = new ParticipantItem({
            target: document.querySelector("#participants") as HTMLElement,
            props: {
                participantName: name
            }
        });
        participantItems.set(p.sid, card);
        p.on(ParticipantEvent.IsSpeakingChanged, (speaking: boolean)=>{
            const participantItem = (participantItems.get(p.sid) as ParticipantItem);
            if(speaking)
                participantItem.activate();
            else
                participantItem.deActivate();

        });



    });




</script>

<svelte:head>
    <title>VisualLinkX</title>
    <meta name="description" content="VisualLinkX the high end video conferencing app" />
</svelte:head>

<div class="background flex">
    <Header></Header>
    <div class="container flex items-center justify-start flex-col-reverse md:flex-row flex-wrap overflow-auto">
        <Card.Root id="participants" class="border-white overflow-auto h-[90%] border-[1px] p-3 flex flex-col gap-[2%] items-center flex-1 ">

        </Card.Root>
        <div id="participant-videos" class="aspect-video border bg-card text-card-foreground shadow h-[90%] flex-1 p-4  " >
            <video id="local" class="rounded-xl bg-card border aspect-video w-full" autoplay ></video>
<!--            <video class="rounded-xl bg-card border aspect-video w-full"></video>-->



        </div>
    </div>
</div>

<style>
    :global(html,body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
        'Open Sans', 'Helvetica Neue', sans-serif;
        /*min-height: 100vh;*/
        overflow: hidden;
    }
    :global(#participant-videos) {
        /*visibility: hidden;*/
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-template-rows: repeat(auto-fit, 1fr);
        column-gap: 10px;
        row-gap: 10px;
        justify-content: center;
        align-content: center;

    }
    .container{
        min-width: 100%;
        height: 100%;
        /*flex-direction: column;*/
        justify-content: space-evenly;
        gap: 1%;
        box-shadow: hsla(var(--accent)) 0px 50px 100px -78px inset;
    }
    .background{
        /*background-color: #092327;*/
        /*background-color: #092327;*/
        width: 100%;
        height: 100vh;
        align-items: center;
        flex-direction: column;
    }
</style>
