<script>
    import Header from "$lib/components/Header.svelte";
    import * as Card from "$lib/components/ui/card";
    import * as Carousel from "$lib/components/ui/carousel";
    import Autoplay from "embla-carousel-autoplay";

    import { Separator } from "$lib/components/ui/separator";
    import LeftSection from "$lib/components/LeftSection.svelte";
    import RightSection from "$lib/components/RightSection.svelte";
</script>

<svelte:head>
    <title>VisualLinkX</title>
    <meta name="description" content="VisualLinkX the high end video conferencing app" />
</svelte:head>

<div class="background flex">
    <Header></Header>
    <div class="container flex items-center flex-col-reverse md:flex-row">
        <LeftSection></LeftSection>
        <Separator orientation="vertical" class="h-3/5 max-md:hidden"/>
        <RightSection></RightSection>
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
        gap: 2%;
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
