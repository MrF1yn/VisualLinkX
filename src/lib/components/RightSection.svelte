<script>
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
import * as Card from "$lib/components/ui/card";
    import {Separator} from "$lib/components/ui/separator";

</script>

<!--<div class="right-sec w-[40%] h-[80vh] min-h-0  flex items-center justify-center">-->
<div class="p-1 w-full md:w-[40%] h-1/2 md:h-[90%]">
    <Card.Root class=" h-full border-white border-[1px] flex flex-col justify-items justify-evenly">
        <Card.Header>
            <Card.Title class="text-3xl break-words">Your HD video call awaits you!.</Card.Title>
            <Card.Description class="text-1xl">Enjoy seamless high definition video calls with VisualLinkX.</Card.Description>
        </Card.Header>
        <Card.Content>
            <form>
                <div class="grid w-full items-center gap-[5%]">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="name">Name</Label>
                        <Input id="name" placeholder="enter your name" />
                    </div>
                    <Button>Create a Meeting</Button>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="meeting-link">Join a meeting</Label>
                        <Input id="meeting-link" placeholder="enter your meeting link"/>
                    </div>
                    <Button>Join</Button>
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