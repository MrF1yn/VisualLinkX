<script lang="ts">
    import * as Select from "$lib/components/ui/select";
    import {Slider} from "$lib/components/ui/slider/index.js";
    import { Separator } from "$lib/components/ui/separator";

</script>

<div class="flex pt-10">
    <div class="w-full h-full flex p-3">
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
    </div>
    <div>
        <Separator orientation="vertical" class="min-h-full" />
    </div>
    <div class="w-full h-full flex flex-wrap gap-10 p-3">
        <Select.Root>
            <Select.Trigger class="w-full min-h-[50px]">
                <Select.Value placeholder="Microphone"/>
            </Select.Trigger>
            <Select.Content>
                <Select.Item value="light">Light</Select.Item>
                <Select.Item value="dark">Dark</Select.Item>
                <Select.Item value="system">System</Select.Item>
            </Select.Content>
        </Select.Root>
        <!--    <Slider value={[50]} max={100} step={1} class="max-w-[70%]" />-->
        <Slider value={[50]} max={100} step={1} class="w-full"/>
    </div>
</div>

<style>

</style>