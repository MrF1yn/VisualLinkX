# VisualLinkX
High Definition Video Calling Web App leveraging the power of SvelteKit, LiveKit, Redis, MongoDB with fully Server Side Rendering Support and GitHUB/Google Auth.
Made by using SvelteKit, ShadCn-Svelte, TailwindCss, LiveKitSDK  
## How to run the visualLinkX server locally  
- clone the repo into an appropriate folder
- run ``npm install`` to install all the dependencies
- run ``npm run build`` to build the production copy
- run ``npm run start`` to start the local server on port 3000
- run ``.\livekit-server.exe --dev --config config.yaml`` to start the sfu(Selective Forwarding Unit) for media encoding.
- Now you can open the the web app by going to the following url ``https://localhost:3000`` and enjoy HD video calls with zero limitations with your friends.
- ``Note: Redis and mongodb is not required when running locally since the information are stored in memory. If you plan to host this in a remote hosting then its recommended to setup a redis server and mongo db for a more reliable experience in case of failure.``
