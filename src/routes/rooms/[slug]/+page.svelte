<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import userName from "$lib/Store";
    import { toast } from "svelte-sonner";
    import {onMount} from "svelte";
    import ParticipantItem from "$lib/components/ParticipantItem.svelte";
    import {page} from '$app/stores'
    import type {PageData} from './$types';
    import * as Card from "$lib/components/ui/card";
    import {LocalParticipant, LocalTrack, type LocalTrackPublication, ParticipantEvent, Track} from "livekit-client";

    import ParticipantVideo from "$lib/components/ParticipantVideo.svelte";
    import {ClientRoomManager} from "../ClientRoomManager";
    import {Button} from "$lib/components/ui/button";
    import {faGear, faMicrophoneLines, faMicrophoneLinesSlash, faVideo, faVideoSlash, faUserGroup, faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome";
    import type {IconType} from "svelte-awesome/components/Icon.svelte";

    export let data: PageData;
    let micIcon: IconType = faMicrophoneLines;
    let vidIcon: IconType = faVideo;
    let clientRoomManager: ClientRoomManager;

    async function onMicButtonClick(e: any){
        if(!clientRoomManager)return;
        let p = clientRoomManager.room.localParticipant;
        if(!p)return;
        const track = p.getTrack(Track.Source.Microphone)?.track;
        if(!track)return;
        if(track.isMuted) {
            await track.unmute();
            updateLocalMuteButtonUi(track);
            return;
        }
        await track.mute();
        updateLocalMuteButtonUi(track);

    }
    async function onVideoButtonClick(e: any) {
        if (!clientRoomManager) return;
        let p = clientRoomManager.room.localParticipant;
        if (!p) return;
        const track = p.getTrack(Track.Source.Camera)?.track;
        if (!track) return;
        if (track.isMuted) {
            await track.unmute();
            updateLocalMuteButtonUi(track);
            return;
        }
        await track.mute();
        updateLocalMuteButtonUi(track);

    }
    function updateLocalMuteButtonUi(track: LocalTrack | undefined){
        if (!track)return;
        if(track.source===Track.Source.Microphone) {
            micIcon = track.isMuted ? faMicrophoneLinesSlash : faMicrophoneLines;
            return;
        }
        if(track.source===Track.Source.Camera){
            vidIcon = track.isMuted ? faVideoSlash : faVideo;
        }
    }

    onMount(async ()=>{
        //TODO: VIDEO ELEMENT BORDER SIZE INCREASE AND ADD GREEN GLOW ON SOUND
        let name = "";
        userName.subscribe((n)=>{
            name = n;
        });
        // const name = $page.url.searchParams.get('name');
        const meetingID = (data as {meetingID: string}).meetingID;
        console.log(name);


        if(!name)return;
        clientRoomManager = new ClientRoomManager(meetingID, name);
        await clientRoomManager.init();
        const p = clientRoomManager.room.localParticipant;


        // const localVid = (document.querySelector("#local") as HTMLVideoElement );
        let videoItem = new ParticipantVideo({
            target: document.querySelector("#participant-videos") as HTMLElement,
            props:{
                track: p.getTrack(Track.Source.Camera)?.track as Track,
                ide: p.sid
            }
        })

        let card = new ParticipantItem({
            target: document.querySelector("#participants") as HTMLElement,
            props: {
                participantName: name
            }
        });
        clientRoomManager.participantItems.set(p.sid, card);
        clientRoomManager.participantVideoItems.set(p.sid, videoItem);
        p.on(ParticipantEvent.IsSpeakingChanged, (speaking: boolean)=>{
            const participantItem = (clientRoomManager.participantItems.get(p.sid) as ParticipantItem);
            const participantVideoItem = (clientRoomManager.participantVideoItems.get(p.sid) as ParticipantVideo);
            if(speaking) {
                participantItem.activate();
                participantVideoItem.activate();
            }
            else {
                participantItem.deActivate();
                participantVideoItem.deActivate();
            }

        });
        updateLocalMuteButtonUi(p.getTrack(Track.Source.Microphone)?.track);
        updateLocalMuteButtonUi(p.getTrack(Track.Source.Camera)?.track);



    });




</script>

<svelte:head>
    <title>VisualLinkX</title>
    <meta name="description" content="VisualLinkX the high end video conferencing app" />
</svelte:head>

<div class="background flex">
    <Header></Header>
    <div class="container flex items-center  flex-col md:flex-row  overflow-auto p-3 justify-evenly gap-3"    >
        <div id="participants" class="hidden"></div>
        <div id="participant-videos" class="aspect-video w-full md:w-auto md:h-[95%]  overflow-auto" >
<!--            <video id="local" class="rounded-xl bg-card border aspect-video w-full" autoplay ></video>-->
        </div>
        <div class="flex flex-row md:flex-col bg-accent w-full h-[55px] md:w-[85px] md:h-[90%] md:rounded-md  items-center justify-evenly p-1 md:p-3
        shadow-[0_0px_90px_5px_rgba(101,40,200)]">
            <Button  class="h-full w-[15%] md:w-full md:h-[15%]" >
                <Icon data={faUserGroup} scale={2.5} class="text-palette1-3"></Icon>
            </Button>
            <Button  variant="{micIcon===faMicrophoneLinesSlash?'destructive':'default'}"  class="h-full w-[15%] md:w-full md:h-[15%]" on:click={onMicButtonClick}>
                <Icon data={micIcon} scale={2.5} class="text-palette1-3"></Icon>
            </Button>
            <Button variant="{vidIcon===faVideoSlash?'destructive':'default'}" class="h-full w-[15%] md:w-full md:h-[15%]" on:click={onVideoButtonClick}>
                <Icon data={vidIcon} scale={2.5} class="text-palette1-3"></Icon>
            </Button>
            <Button  class="h-full w-[15%] md:w-full md:h-[15%] hover:bg-destructive transition duration-300 ease-in-out">
                <Icon data={faArrowRightFromBracket} scale={2.5} class="text-palette1-3"></Icon>
            </Button>
            <Button  class="h-full w-[15%] md:w-full md:h-[15%]">
                <Icon data={faGear} scale={2.5} class="text-palette1-3"></Icon>
            </Button>


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
        /*justify-content: space-evenly;*/
        /*gap: 1%;*/
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
