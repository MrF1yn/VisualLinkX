<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import github from "svelte-awesome/icons/github";
    import {Button} from "$lib/components/ui/button";
    import Icon from "svelte-awesome";
</script>


<nav class="navbar rounded-md flex flex-wrap justify-between  " >
    <div class="title text-palette1-3">
        VisualLink X
    </div>
    <div class="flex items-center">
        <Button  variant="link">
            <Icon data={github} scale={2.5} class="text-palette1-3"></Icon>
        </Button>
        <Avatar.Root class="m-[15px]">
            <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn"/>
            <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar.Root>
    </div>


</nav>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    .navbar{

        align-items: center;
        margin: 15px;
        width: 100%;
        height: 80px;
        /*border-radius: 5px;*/
    }

    .title{
        text-align: left;
        /*vertical-align: middle;*/
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 15px;
        font-family: 'Roboto', sans-serif;
        font-size: xx-large;
        letter-spacing: 3px;
        width: fit-content;
    }
</style>
