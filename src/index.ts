import 'dotenv/config';
import { Client, GatewayIntentBits, Guild, GuildMember } from 'discord.js';
import gkm from "gkm";

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates] });
var guild: Guild;
var user: GuildMember;
var keyPresses: string[] = [];

async function main() {
    client.on('ready', async () => {
        console.log(`Logged in as ${client.user.tag}!`);
        guild = await client.guilds.fetch("1004810236504330290");
        user = await guild.members.fetch("1004808840677695539");

    });

    gkm.events.on('key.*', async function (data) {
        if (this.event == "key.released") {
            keyPresses = [];
            return;
        }

        if (this.event != "key.pressed")
            return;

        keyPresses.push(data[0]);

        if (keyPresses.includes("Left Alt") && keyPresses.includes("Left Shift") && keyPresses.includes("M")) {
            let currentChannel = user?.voice.channelId;
            await user?.voice.setChannel("1026838686358319114");
            await user?.voice.setChannel(currentChannel);
        }
    });

    await client.login(process.env.BOT_TOKEN);
}

main();