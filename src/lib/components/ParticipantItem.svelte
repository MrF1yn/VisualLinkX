<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    export let participantName: string = "";
    let color = "bg-accent";
    export function activate() {
        color = "bg-green-500";
    }

    export function deActivate() {
        color = "bg-accent";
    }

</script>


<Card.Root class="w-full p-2 {color}">
    {participantName}
</Card.Root>

