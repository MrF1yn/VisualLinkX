<script lang="ts">

    export let participant: string;
    export let message: string;
    export let time: string;

    export let local: boolean;

</script>


<div class="flex-row w-fit h-fit mt-3 p-2 rounded-md {local?'rounded-tr-none ml-auto':'rounded-tl-none'} bg-gray-800 ">
    <div class="text-sm font-bold">{participant}</div>
    <div class="flex justify-between gap-3">
        <div>{message}</div>
        <div class="text-xs font-thin mt-auto ml-auto">{time}</div>
    </div>

</div>

<style>

</style>