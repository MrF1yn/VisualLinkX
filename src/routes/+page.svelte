<script>
	import Header from "./Header.svelte";
	import * as Card from "$lib/components/ui/card";
	import * as Carousel from "$lib/components/ui/carousel";
	import Autoplay from "embla-carousel-autoplay";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Separator } from "$lib/components/ui/separator";

	const plugin = Autoplay({delay: 5000, stopOnInteraction: false });
</script>

<svelte:head>
	<title>VisualLinkX</title>
	<meta name="description" content="VisualLinkX the high end video conferencing app" />
</svelte:head>

<div class="background flex">
	<Header></Header>
	<div class="container flex items-center flex-row">
		<div class="left-sec w-[60%] min-h-0 flex items-center justify-center ">
			<Carousel.Root
					plugins={[plugin]}
					class="w-[100%]"

			>
				<Carousel.Content>
					{#each Array(5) as _, i (i)}
						<Carousel.Item>
							<div class="p-1">
								<Card.Root class="border-white border-[1px]">
									<Card.Content
											class="flex items-center h-[80vh] min-h-0 justify-center p-6"
									>
										<span class="text-4xl font-semibold">{i + 1}</span>
									</Card.Content>
								</Card.Root>
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>

			</Carousel.Root>
		</div>
		<Separator orientation="vertical" class="h-3/5"/>
		<div class="right-sec w-[40%] h-[80vh] min-h-0  flex items-center justify-center">

			<Card.Root class="w-[100%] h-full border-white border-[1px]">
				<Card.Header>
					<Card.Title>Create project</Card.Title>
					<Card.Description>Deploy your new project in one-click.</Card.Description>
				</Card.Header>
				<Card.Content>
					<form>
						<div class="grid w-full items-center gap-4">
							<div class="flex flex-col space-y-1.5">
								<Label for="name">Name</Label>
								<Input id="name" placeholder="Name of your project" />
							</div>
							<div class="flex flex-col space-y-1.5">
								<Label for="framework">Framework</Label>
<!--								<Select.Root>-->
<!--									<Select.Trigger id="framework">-->
<!--										<Select.Value placeholder="Select" />-->
<!--									</Select.Trigger>-->
<!--									<Select.Content>-->
<!--										{#each frameworks as framework}-->
<!--											<Select.Item value={framework.value} label={framework.label}-->
<!--											>{framework.label}</Select.Item-->
<!--											>-->
<!--										{/each}-->
<!--									</Select.Content>-->
<!--								</Select.Root>-->
							</div>
						</div>
					</form>
				</Card.Content>
				<Card.Footer class="flex justify-between">
					<Button variant="outline">Cancel</Button>
					<Button>Deploy</Button>
				</Card.Footer>
			</Card.Root>

		</div>
	</div>
</div>

<style>
	:global(html,body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
		'Open Sans', 'Helvetica Neue', sans-serif;
		/*min-height: 100vh;*/
		overflow: hidden;
	}
	.container{
		min-width: 100%;
		height: 100%;
		/*flex-direction: column;*/
		justify-content: space-evenly;
		gap: 2%;
		box-shadow: hsla(var(--accent)) 0px 50px 100px -78px inset;
	}
	.background{
		/*background-color: #092327;*/
		/*background-color: #092327;*/
		width: 100%;
		height: 100vh;
		align-items: center;
		flex-direction: column;
	}
</style>
