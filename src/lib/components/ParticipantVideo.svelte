<script lang="ts">
    import type {RemoteTrack, Track} from "livekit-client";
     import {onMount} from "svelte";

     export let ide: string = "";
     export let track: Track;

     let color = "";

     onMount(()=>{
         track.attach(document.getElementById(ide) as HTMLVideoElement);
     });


     export function activate() {
         color = "border-green-500 border-2";
     }

     export function deActivate() {
         color = "";
     }






     // export function attach(track: RemoteTrack){
     //     track.attach(document.getElementById(id) as HTMLVideoElement);
     // }

</script>

<video id="{ide}" class="rounded-xl bg-card border aspect-video w-full {color} " autoplay ></video>

<style>

</style>