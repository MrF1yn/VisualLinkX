<script lang="ts">
    import {type Participant, ParticipantEvent, RemoteTrack, Track, TrackEvent} from "livekit-client";
     import {onMount} from "svelte";
    import {faMicrophone, faMicrophoneSlash, faVideoSlash} from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome";


     // export let ide: string = "";
     export let participant: Participant | null;
     export let track: Track | null;

     let color = "";

     onMount(()=>{
         if(participant===null || track == null)return;
         track.attach(document.getElementById(participant.sid) as HTMLVideoElement);
         participant.on(ParticipantEvent.TrackMuted, (t)=>{
             if(t.source === Track.Source.Microphone){

                 return;
             }
             if (t.source === Track.Source.Camera) {

                 return;
             }
         })
         participant.on(ParticipantEvent.TrackUnmuted, (t) => {
             if (t.source === Track.Source.Microphone) {

                 return;
             }
             if (t.source === Track.Source.Camera) {

                 return;
             }

         })
     });


     export function activate() {
         color = "border-green-500 ";
     }

     export function deActivate() {
         color = "";
     }

</script>

<div class="video-item">
<!--    <div class="w-full h-full top-0 left-0 bg-red-600 flex justify-center items-center" >-->
<!--        <Icon data={faVideoSlash} scale={5}></Icon>-->
<!--    </div>-->
    <video id="1"
           class="rounded-xl bg-card border-2 aspect-video w-full box-border {color} overflow-hidden" autoplay>

    </video>
</div>


<style>
    .video-item{
        flex: 0 0 calc(33.33% - 20px);
        min-width: 340px;
        margin: 10px;
        aspect-ratio: 16/9;
    }
</style>