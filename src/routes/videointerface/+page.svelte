<script>
    import Header from "$lib/components/Header.svelte";
    import * as Card from "$lib/components/ui/card";
    import * as Carousel from "$lib/components/ui/carousel";
    import Autoplay from "embla-carousel-autoplay";

    import { Separator } from "$lib/components/ui/separator";
    import LeftSection from "$lib/components/LeftSection.svelte";
    import RightSection from "$lib/components/RightSection.svelte";
    import {Button} from "radix-icons-svelte";



</script>

<svelte:head>
    <title>VisualLinkX</title>
    <meta name="description" content="VisualLinkX the high end video conferencing app" />
</svelte:head>

<div class="background flex">
    <Header></Header>
    <div class="container flex items-center justify-start flex-col-reverse md:flex-row">
        <Card.Root class="border-white w-[20%] h-[95%] border-[1px] flex flex-col">
            <Button class="w-full h-full"></Button>
        </Card.Root>
        <Card.Root class="border-white w-[60%] h-[95%] border-[1px]">

        </Card.Root>
        <Card.Root class="border-white w-[20%] h-[95%] border-[1px]">

        </Card.Root>


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
