<script lang="ts">
    import {goto} from '$app/navigation';
    import userName from "../Store";
    import {Button} from "$lib/components/ui/button";
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";
    import * as Card from "$lib/components/ui/card";
    import {Separator} from "$lib/components/ui/separator";
    import {backendIp} from "../../routes/rooms/ClientRoomManager";
    import {toast} from "svelte-sonner";

    let name: string;
    let meetingLink: string;
    let joinInputBorder: string ="";
    async function create() {
        userName.set(name);
        const response = await fetch(`${backendIp}/create-id`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        const meetingID = (await response.json()).meetingID;

        goto(`/rooms/${meetingID}`);
    }

    async function join(){
        userName.set(name);
        console.log(meetingLink);
        let meetingID = meetingLink.split("rooms/").pop();
        if(!meetingID)
            meetingID = meetingLink;
        const response = await fetch(`${backendIp}/validate-id`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({meetingID: meetingID})
        });
        if(response.status!=200){
            toast("Invalid Meeting Id!", {
                description: "Please enter a valid meeting Id"
            });
            joinInputBorder="border-red-600 outline-red-600";
            meetingLink = "";
            return;
        }
        goto(`/rooms/${meetingID}`);
    }

    $: if(meetingLink){
        joinInputBorder="";
    }



</script>

<!--<div class="right-sec w-[40%] h-[80vh] min-h-0  flex items-center justify-center">-->
<div class="p-1 w-full md:w-[30%] h-1/2 md:h-[90%]">
    <Card.Root class=" h-full border-white border-[1px] flex flex-col justify-items justify-evenly">
        <Card.Header>
            <Card.Title class="text-2xl md:text-3xl break-words">Your HD video call awaits you!.</Card.Title>
            <Card.Description class="text-1xl max-md:hidden">Enjoy seamless high definition video calls with
                VisualLinkX.
            </Card.Description>
        </Card.Header>
        <Card.Content>

            <div class="grid w-full items-center gap-[5%]">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="name">Name</Label>
                        <Input bind:value={name} id="name" name="name" placeholder="enter your name to create or join a meeting"/>
                        <Button disabled={!name} on:click={create}>
                            Create a Meeting
                        </Button>
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="meeting-link">Join</Label>
                        <Input class="{joinInputBorder}" bind:value={meetingLink} id="meeting-link" name="meeting-link" placeholder="enter your meeting link"/>
                        <Button disabled={!(meetingLink && name) } on:click={join}>Join a Meeting</Button>
                    </div>

                <Separator></Separator>
            </div>


        </Card.Content>

        <Card.Footer class="justify-center items-center">

        </Card.Footer>
    </Card.Root>
    <!--</div>-->
</div>

<style>

</style>