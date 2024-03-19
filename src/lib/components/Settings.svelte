<script lang="ts">
    import * as Select from "$lib/components/ui/select";
    import {Slider} from "$lib/components/ui/slider/index.js";
    import {Separator} from "$lib/components/ui/separator";
    import {faMicrophone, faUserGroup, faVideo} from "@fortawesome/free-solid-svg-icons";
    import {Button} from "$lib/components/ui/button";
    import Icon from "svelte-awesome";

</script>

<div class="flex pt-10">
    <div class="w-full h-full flex flex-col p-3 " >
        <div class="flex w-full justify-between gap-4">
            <Select.Root>
                <Select.Trigger class="w-full min-h-[50px]">
                    <Select.Value placeholder="Camera"/>
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="light">Light</Select.Item>
                    <Select.Item value="dark">Dark</Select.Item>
                    <Select.Item value="system">System</Select.Item>
                </Select.Content>
            </Select.Root>
            <Button class="min-h-[50px] w-[10%]" variant="outline">
                <Icon data={faVideo} scale={1.5} class="text-palette1-3"></Icon>
            </Button>
        </div>
    </div>
    <div>
        <Separator orientation="vertical" class="min-h-full"/>
    </div>
    <div class="w-full h-full flex flex-col gap-10 p-3">
        <div class="flex w-full justify-between gap-4">
            <Select.Root>
                <Select.Trigger class="w-[90%] min-h-[50px]">
                    <Select.Value placeholder="Microphone"/>
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="light">Light</Select.Item>
                    <Select.Item value="dark">Dark</Select.Item>
                    <Select.Item value="system">System</Select.Item>
                </Select.Content>
            </Select.Root>
            <Button class="min-h-[50px] w-[10%]" variant="outline">
                <Icon data={faMicrophone} scale={1.5} class="text-palette1-3"></Icon>
            </Button>
        </div>
        <!--    <Slider value={[50]} max={100} step={1} class="max-w-[70%]" />-->
        <Slider value={[50]} max={100} step={1} class="w-full"/>
    </div>
</div>

<style>

</style>