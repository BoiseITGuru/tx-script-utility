# Emerald City Playground - Flow Transaction & Script Utility

:warning: THIS PROJECT IS UNDER ACTIVE DEVELOPMENT AND NOT READY FOR PRODUCTION USAGE!

The Emerald City Playground started from the Transaction & Script Utility bounty on the Flow Blockchain. It has since evolved into an alternative IDE to the Flow Playground allowing you to interact not just with the Flow Emulator but also with the Flow Test & Main networks.

## Challenges

The original plan was to run the Flow Emulator inside a WebAssembly Service Worker in the end-user's browser, this would have allowed us to run the site with considerably fewer resources than running it from our servers/host. Unfortunately, the Flow Emulator has dependencies that are not supported in WebAssembly at this time. Since we are unable to run the Flow Emulator directly in the browser, we are left with either interacting with a local emulator or deploying the emulators for end-users on our infrastructure.

Running the Flow Emulator on our infrastructure would require significant extra development to tie the running emulators to sessions and our user accounts. It will also require significant resources to deploy emulators for every project on the platform. The Flow Playground has gotten around some of these limitations but not running a full emulator and starting a limited version of the Flow Virtual Machine alongside each project/session. Part of the reasoning for building the Emerald City Playground was to specifically add the features missing in the Flow Playground that are created by the limitations they have set.

To get a working version as quickly as possible and requiring the least amount of resources/development a custom CLI was created that starts a local Flow Emulator on the end-user's computer and uses WebSockets to directly link the emulator with the Emerald City Playground. This not only allows the playground to do things like restart/reset the emulator's state and automatically create accounts/deploy contracts but also allows it to utilize FCL for all interactions across the emulator, testnet, and mainnet.

## How to use with the Flow Emulator

Eventually, we might run the Flow Emulator for users as part of the application. However, while those systems are still being discussed, we have created a special CLI tool to start the emulator and give the Emerald City Playground direct access to it.

Use the link below to learn more about the CLI or you can install it directly using NPM <Insert NPM Package Info Here>

[EmeraldCity-CLI](https://github.com/BoiseITGuru/EmeraldCity-CLI)

## Current Status

The playground and CLI are still undergoing heavy development, the CLI is written in GO and requires manual compiling still. Once we have finished development it will be available as an NPM package. Currently, the CLI connects to the playground and starts the emulators as well as executes scripts.

## Known Issues

1. The CLI does not safely close the emulator when the WebSocket connection is closed. The emulator is killed but leaves the ports hanging open causing the CLI to crash when the WebSocket is reconnected. To resolve you must map the ports to their PID and use ```kill -9 <PID>``` to close the ports before restarting the CLI.