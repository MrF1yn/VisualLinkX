<script lang="ts">
    import { goto } from '$app/navigation';
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
import * as Card from "$lib/components/ui/card";
    import {Separator} from "$lib/components/ui/separator";
    async function submitForm(e: Event){
        const data = new FormData(e.target as HTMLFormElement);
        // const response = await fetch("http://localhost:3000/create", {
        //     method: "POST",
        //     body: data
        // })
        // const responseData = response.body;
        // console.log(responseData);
        goto(`/rooms/test?name=${data.get('name')}`);



    }



</script>

<!--<div class="right-sec w-[40%] h-[80vh] min-h-0  flex items-center justify-center">-->
<div class="p-1 w-full md:w-[40%] h-1/2 md:h-[90%]">
    <Card.Root class=" h-full border-white border-[1px] flex flex-col justify-items justify-evenly">
        <Card.Header>
            <Card.Title class="text-2xl md:text-3xl break-words">Your HD video call awaits you!.</Card.Title>
            <Card.Description class="text-1xl max-md:hidden">Enjoy seamless high definition video calls with VisualLinkX.</Card.Description>
        </Card.Header>
        <Card.Content>
            <form on:submit|preventDefault={submitForm}>
                <div class="grid w-full items-center gap-[5%]">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="name">Name</Label>
                        <Input id="name" name="name" placeholder="enter your name" />
                        <Button type="submit">Create a Meeting</Button>
                    </div>

                    <div class="flex flex-col space-y-1.5">
                        <Label for="meeting-link">Join</Label>
                        <Input id="meeting-link" name="meeting-link" placeholder="enter your meeting link"/>
                        <Button type="submit">Join a Meeting</Button>
                    </div>

                    <Separator></Separator>
                </div>
            </form>

        </Card.Content>

        <Card.Footer class="justify-center items-center">

        </Card.Footer>
    </Card.Root>
<!--</div>-->
</div>

<style>

</style>