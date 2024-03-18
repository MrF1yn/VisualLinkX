<script lang="ts">
    import * as Select from "$lib/components/ui/select";

</script>

<div class="flex pb-[20%] pt-[5%] justify-evenly">
    <Select.Root>
        <Select.Trigger class="w-[30%] min-h-[50px]">
            <Select.Value placeholder="Camera" />
        </Select.Trigger>
        <Select.Content>
            <Select.Item value="light">Light</Select.Item>
            <Select.Item value="dark">Dark</Select.Item>
            <Select.Item value="system">System</Select.Item>
        </Select.Content>
    </Select.Root>
    <Select.Root>
        <Select.Trigger class="w-[30%] min-h-[50px]">
            <Select.Value placeholder="Microphone"/>
        </Select.Trigger>
        <Select.Content>
            <Select.Item value="light">Light</Select.Item>
            <Select.Item value="dark">Dark</Select.Item>
            <Select.Item value="system">System</Select.Item>
        </Select.Content>
    </Select.Root>
</div>

<style>

</style>