<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import { toast } from "svelte-sonner";
    import {onMount} from "svelte";
    import ParticipantItem from "$lib/components/ParticipantItem.svelte";
    import {page} from '$app/stores'
    import type {PageData} from './$types';
    import * as Card from "$lib/components/ui/card";
    import {
        LocalParticipant,
        LocalTrackPublication,
        Participant, ParticipantEvent,
        RemoteParticipant,
        RemoteTrack,
        RemoteTrackPublication,
        Room,
        RoomEvent,
        Track,
        VideoPresets
    } from "livekit-client";

    import ParticipantVideo from "$lib/components/ParticipantVideo.svelte";
    let participantItems = new Map();

    export let data: PageData;
    onMount(async ()=>{
        const name = $page.url.searchParams.get('name');
        const meetingID = (data as {meetingID: string}).meetingID;
        if(!name)return;
        const body = {name: name, meetingID: meetingID};

        const response = await fetch("http://localhost:3000/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        });
        const token = (await response.json()).token;



// creates a new room with options
        const room = new Room({
            // automatically manage subscribed video quality
            adaptiveStream: true,

            // optimize publishing bandwidth and CPU for published tracks
            dynacast: true,

            // default capture settings
            videoCaptureDefaults: {
                resolution: VideoPresets.h720.resolution,
            },
        });

// pre-warm connection, this can be called as early as your page is loaded
        room.prepareConnection("ws://127.0.0.1:7880", token);

// set up event listeners
        room
            .on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
            .on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
            .on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakerChange)
            .on(RoomEvent.Disconnected, handleDisconnect)
            .on(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished)
            // .on(RoomEvent.ParticipantConnected, handleParticipantConnected)

// connect to room
        await room.connect('ws://127.0.0.1:7880', token);
        console.log('connected to room', room.name);

// publish local camera and mic tracks
        await room.localParticipant.enableCameraAndMicrophone();

        function handleParticipantConnected(participant: RemoteParticipant){
            let card = new ParticipantItem({
                target: document.querySelector("#participants") as HTMLElement,
                props: {
                    participantName: participant.identity
                }
            });
        }

        function handleSpeakingChanged(speaking: boolean){



        }

        function handleTrackSubscribed(
            track: RemoteTrack,
            publication: RemoteTrackPublication,
            participant: RemoteParticipant,
        ) {

            if (track.kind === Track.Kind.Video || track.kind === Track.Kind.Audio) {

                if(track.kind !== Track.Kind.Video)return;
                let vidElm: ParticipantVideo = new ParticipantVideo({
                    target: document.querySelector("#participant-videos") as HTMLElement,
                    props:{
                        ide: participant.identity.replaceAll(" ", "-"),
                        track: track
                    }
                });
                let card = new ParticipantItem({
                    target: document.querySelector("#participants") as HTMLElement,
                    props: {
                        participantName: participant.identity
                    }
                });
                participantItems.set(participant.identity, card);
                participant.on(ParticipantEvent.IsSpeakingChanged, (speaking: boolean)=>{
                    const participantItem = (participantItems.get(participant.identity) as ParticipantItem);
                    if(speaking)
                        participantItem.activate();
                    else
                        participantItem.deActivate();
                });

                toast(`${participant.identity} has joined the call!`, {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                })
                // vidElm.setID(participant.identity as string);
                // console.log(vidHtm);
                // track.attach(vidHtm);
                // vid.requestFullscreen();

            }
        }

        function handleTrackUnsubscribed(
            track: RemoteTrack,
            publication: RemoteTrackPublication,
            participant: RemoteParticipant,
        ) {
            track.detach();
            if(track.kind === Track.Kind.Video){
                (document.getElementById(participant.identity) as HTMLElement).$destroy();
            }
        }

        function handleLocalTrackUnpublished(
            publication: LocalTrackPublication,
            participant: LocalParticipant,
        )
        {
            if(!publication.track)return;
            publication.track.detach();
        }

        function handleActiveSpeakerChange(speakers: Participant[]) {
        }

        function handleDisconnect() {
            console.log('disconnected from room');
        }

        const p = room.localParticipant;
        const localVid = (document.querySelector("#local") as HTMLVideoElement );
        p.getTrack(Track.Source.Camera)?.track?.attach(localVid);


        let card = new ParticipantItem({
            target: document.querySelector("#participants") as HTMLElement,
            props: {
                participantName: name
            }
        });
        participantItems.set(name, card);
        p.on(ParticipantEvent.IsSpeakingChanged, (speaking: boolean)=>{
            const participantItem = (participantItems.get(name) as ParticipantItem);
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
