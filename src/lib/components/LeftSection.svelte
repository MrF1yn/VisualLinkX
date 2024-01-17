<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Carousel from "$lib/components/ui/carousel";
    import Autoplay from "embla-carousel-autoplay";
    const plugin = Autoplay({delay: 5000, stopOnInteraction: false });


</script>


<!--<div class="left-sec w-[60%] min-h-0 flex items-center justify-center ">-->
    <Carousel.Root
            plugins={[plugin]}
            class="w-full md:w-[60%] h-1/2 md:h-[90%]"

    >
        <Carousel.Content class="h-full">
            {#each Array(5) as _, i (i)}
                <Carousel.Item class="">
                    <div class="p-1 h-full">
                        <Card.Root class="border-white h-full border-[1px]">
                            <Card.Content
                                    class="flex items-center h-full justify-center p-6"
                            >
                                <span class="text-4xl font-semibold">{i + 1}</span>
                            </Card.Content>
                        </Card.Root>
                    </div>
                </Carousel.Item>
            {/each}
        </Carousel.Content>

    </Carousel.Root>
<!--</div>-->

<style>

</style>