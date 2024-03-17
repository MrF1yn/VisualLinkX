<script lang="ts">
    import {type Participant, ParticipantEvent, RemoteTrack, Track, TrackEvent} from "livekit-client";
    import {onDestroy, onMount} from "svelte";
    import {faMicrophone, faMicrophoneSlash, faVideoSlash} from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome";


     // export let ide: string = "";
     export let participant: Participant | null;
     export let track: Track | null;

     let color = "";

     let cameraMuted = "hidden";
     let micMuted = "hidden"

    // if(document.getElementsByClassName("video-item").length>1){
    //     setInitialSize("33.33");
    // }
    //
    // onDestroy(()=>{
    //     if(document.getElementsByClassName("video-item").length<2){
    //         setInitialSize("100");
    //     }
    // });


     onMount(()=>{
         if(participant===null || track == null)return;
         track.attach(document.getElementById(participant.sid) as HTMLVideoElement);
         participant.on(ParticipantEvent.TrackMuted, (t)=>{
             if(t.source === Track.Source.Microphone){
                 micMuted = "";
                 return;
             }
             if (t.source === Track.Source.Camera) {
                 cameraMuted = "";
                 return;
             }
         })
         participant.on(ParticipantEvent.TrackUnmuted, (t) => {
             if (t.source === Track.Source.Microphone) {
                 micMuted = "hidden";
                 return;
             }
             if (t.source === Track.Source.Camera) {
                 cameraMuted = "hidden";
                 return;
             }

         })
         participant.on(ParticipantEvent.IsSpeakingChanged, (speaking: boolean)=>{
             if(speaking) {
                 activate();
             }
             else {
                 deActivate();
             }

         });
     });


     export function activate() {
         color = "border-green-500 ";
     }

     export function deActivate() {
         color = "";
     }

</script>

<div class="video-item relative rounded-xl border-2 box-border {color}">
    <div class="aspect-video w-full h-full top-0 left-0 flex justify-end p-5 absolute z-20 rounded-xl {micMuted}" >
        <Icon data={faMicrophoneSlash} scale={3}></Icon>
    </div>
    <div class="aspect-video w-full h-full top-0 left-0 bg-accent flex justify-center items-center absolute z-10 rounded-xl {cameraMuted}">
        <Icon data={faVideoSlash} scale={5}></Icon>
    </div>
    <video id="{participant?.sid}"
           class="aspect-video rounded-xl  w-full overflow-hidden absolute z-0" autoplay>

    </video>
</div>


<style>
    .video-item{
        flex: 0 0 calc(33.33% - 20px);
        min-width: 340px;
        margin: 10px;
        aspect-ratio: 16/9;
        position: relative;
    }
</style>