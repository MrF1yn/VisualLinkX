<script lang="ts">
    import * as Select from "$lib/components/ui/select";

</script>

<div class="bg-red-600 flex">
    <Select.Root>
        <Select.Trigger class="w-[180px]">
            <Select.Value placeholder="Theme" />
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