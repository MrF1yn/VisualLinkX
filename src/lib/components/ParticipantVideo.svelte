<script lang="ts">
     import type {RemoteTrack} from "livekit-client";
     import {onMount} from "svelte";

     export let ide: string = "";
     export let track: RemoteTrack;

     onMount(()=>{
         track.attach(document.getElementById(ide) as HTMLVideoElement);
     });






     // export function attach(track: RemoteTrack){
     //     track.attach(document.getElementById(id) as HTMLVideoElement);
     // }

</script>

<video id="{ide}" class="rounded-xl bg-card border aspect-video w-full" autoplay ></video>

<style>

</style>