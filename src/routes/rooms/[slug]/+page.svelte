<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import userName from "$lib/Store";
    import { toast } from "svelte-sonner";
    import {onMount} from "svelte";
    import ParticipantItem from "$lib/components/ParticipantItem.svelte";
    import {page} from '$app/stores'
    import type {PageData} from './$types';
    import * as Card from "$lib/components/ui/card";
    import {LocalTrack, ParticipantEvent, Track} from "livekit-client";
    import * as Tooltip from "$lib/components/ui/tooltip";

    import ParticipantVideo from "$lib/components/ParticipantVideo.svelte";
    import {ClientRoomManager} from "../ClientRoomManager";
    import {Button} from "$lib/components/ui/button";
    import * as Sheet from "$lib/components/ui/sheet";
    import {faGear, faMicrophoneLines, faMicrophoneLinesSlash, faVideo, faVideoSlash, faUserGroup
        , faArrowRightFromBracket, faCopy, faMessage} from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome";
    import type {IconType} from "svelte-awesome/components/Icon.svelte";
    import {goto} from "$app/navigation";
    import * as url from "url";
    import ParticipantList from "$lib/components/ParticipantList.svelte";
    import GlobalChat from "$lib/components/GlobalChat.svelte";

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
            // updateLocalMuteButtonUi(track);
            return;
        }
        await track.mute();
        // updateLocalMuteButtonUi(track);

    }

    async function onVideoButtonClick(e: any) {
        if (!clientRoomManager) return;
        let p = clientRoomManager.room.localParticipant;
        if (!p) return;
        const track = p.getTrack(Track.Source.Camera)?.track;
        if (!track) return;
        if (track.isMuted) {
            await track.unmute();
            // updateLocalMuteButtonUi(track);
            return;
        }
        await track.mute();
        // updateLocalMuteButtonUi(track);

    }
    // function updateLocalMuteButtonUi(track: LocalTrack | undefined){
    //     if (!track)return;
    //     if(track.source===Track.Source.Microphone) {
    //         micIcon = track.isMuted ? faMicrophoneLinesSlash : faMicrophoneLines;
    //         return;
    //     }
    //     if(track.source===Track.Source.Camera){
    //         vidIcon = track.isMuted ? faVideoSlash : faVideo;
    //     }
    // }



    function copyMeetingLink(){
        navigator.clipboard.writeText(window.location.href);
        toast("Copied Meeting Link!", {
            description:"Meeting link is successfully copied to your clipboard."
        })
    }

    async function disconnect(){
        if (!clientRoomManager) return;
        let p = clientRoomManager.room.localParticipant;
        if (!p) return;
        await clientRoomManager.room.disconnect();
        toast("Disconnected!", {
            description: "Successfully disconnected from the meeting."
        })
        await goto(window.location.origin);
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

        p.on(ParticipantEvent.TrackMuted, (track)=>{
            if(track.source===Track.Source.Microphone) {
                micIcon = faMicrophoneLinesSlash;
                return;
            }
            if(track.source===Track.Source.Camera){
                vidIcon = faVideoSlash;
            }
        });
        p.on(ParticipantEvent.TrackUnmuted, (track) => {
            if (track.source === Track.Source.Microphone) {
                micIcon = faMicrophoneLines;
                return;
            }
            if (track.source === Track.Source.Camera) {
                vidIcon = faVideo;
            }
        });


        // const localVid = (document.querySelector("#local") as HTMLVideoElement );
        let videoItem = new ParticipantVideo({
            target: document.querySelector("#participant-videos") as HTMLElement,
            props:{
                track: p.getTrack(Track.Source.Camera)?.track as Track,
                participant: p,
            }
        })

        // let card = new ParticipantItem({
        //     target: document.querySelector("#participants") as HTMLElement,
        //     props: {
        //         participantName: name
        //     }
        // });
        // clientRoomManager.participantItems.set(p.sid, card);
        clientRoomManager.participantVideoItems.set(p.sid, videoItem);
        // p.on(ParticipantEvent.IsSpeakingChanged, (speaking: boolean)=>{
        //     // const participantItem = (clientRoomManager.participantItems.get(p.sid) as ParticipantItem);
        //     const participantVideoItem = (clientRoomManager.participantVideoItems.get(p.sid) as ParticipantVideo);
        //     if(speaking) {
        //         // participantItem.activate();
        //         participantVideoItem.activate();
        //     }
        //     else {
        //         // participantItem.deActivate();
        //         participantVideoItem.deActivate();
        //     }
        //
        // });
        // updateLocalMuteButtonUi(p.getTrack(Track.Source.Microphone)?.track);
        // updateLocalMuteButtonUi(p.getTrack(Track.Source.Camera)?.track);



    });




</script>

<svelte:head>
    <title>VisualLinkX</title>
    <meta name="description" content="VisualLinkX the high end video conferencing app" />
</svelte:head>

<div class="background flex">
    <Header></Header>
    <div id="participants" class="hidden"></div>
    <div class="container flex items-center  flex-col md:flex-row  overflow-auto p-3 justify-evenly gap-3"    >
<!--        <div/>-->
        <Tooltip.Root>
            <Tooltip.Trigger asChild let:builder>
                <Button builders={[builder]} variant="outline" class="hidden md:flex w-fit h-fit mt-auto mb-4 mr-0 flex-col items-center gap-2 p-3 "
                        on:click={copyMeetingLink}>
                    <Icon data="{faCopy}" scale={1.5}></Icon>
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                <p>Copy Meeting Link</p>
            </Tooltip.Content>
        </Tooltip.Root>

        <div id="participant-videos" class=" w-full md:w-full md:h-[95%]  overflow-auto m-auto flex flex-wrap justify-center items-center" >
<!--            <video id="local" class="rounded-xl bg-card border aspect-video w-full border-green-500 border-2" autoplay ></video>-->
<!--            <ParticipantVideo participant="{null}" track="{null}"/>-->

        </div>

        <div class="flex flex-row md:flex-col bg-accent w-full h-[55px] md:w-[85px] md:h-[90%] md:rounded-md  items-center justify-evenly p-1 md:p-3
        shadow-[0_0px_90px_5px_rgba(101,40,200)]">


                <Sheet.Root>
                    <Sheet.Trigger asChild let:builder>
                        <Button builders={[builder]} class="h-full w-[15%] md:w-full md:h-[15%]">
                            <Icon data={faUserGroup} scale={2} class="text-palette1-3"></Icon>
                        </Button>
                    </Sheet.Trigger>

                    <Sheet.Content side="right">
                        <ParticipantList></ParticipantList>
                    </Sheet.Content>

                </Sheet.Root>

            <Button  variant="{micIcon===faMicrophoneLinesSlash?'destructive':'default'}"  class="h-full w-[15%] md:w-full md:h-[15%]" on:click={onMicButtonClick}>
                <Icon data={micIcon} scale={2.5} class="text-palette1-3"></Icon>
            </Button>
            <Button variant="{vidIcon===faVideoSlash?'destructive':'default'}" class="h-full w-[15%] md:w-full md:h-[15%]" on:click={onVideoButtonClick}>
                <Icon data={vidIcon} scale={2.5} class="text-palette1-3"></Icon>
            </Button>
            <Button  class="h-full w-[15%] md:w-full md:h-[15%] hover:bg-destructive transition duration-300 ease-in-out"
            on:click={disconnect}>
                <Icon data={faArrowRightFromBracket} scale={2.5} class="text-palette1-3"></Icon>
            </Button>
            <Sheet.Root>
                <Sheet.Trigger asChild let:builder>
                    <Button builders={[builder]} class="h-full w-[15%] md:w-full md:h-[15%]">
                        <Icon data={faMessage} scale={2.5} class="text-palette1-3"></Icon>
                    </Button>
                </Sheet.Trigger>

                <Sheet.Content side="right">
                    <GlobalChat/>
                </Sheet.Content>

            </Sheet.Root>
            <Button class="h-full w-[15%] md:w-full md:h-[15%]">
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
    .container{
        min-width: 100%;
        height: 100%;
        box-shadow: hsla(var(--accent)) 0px 50px 100px -78px inset;
    }
    .background{
        width: 100%;
        height: 100vh;
        align-items: center;
        flex-direction: column;
    }
</style>
