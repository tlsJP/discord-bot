import { Client, Collection, SlashCommandBuilder } from "discord.js";


export class MyClient extends Client{
     commands: Collection<SlashCommandBuilder,any> = new Collection();
}