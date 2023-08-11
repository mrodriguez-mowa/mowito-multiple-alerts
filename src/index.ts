import * as dotenv from "dotenv"
dotenv.config({
    path: __dirname + '/.env'
})

import { Channel, Client, IntentsBitField } from 'discord.js';
import TelegramAlertsRepository from "./repository/TelegramAlertsRepository"
import logger from './util/logger';

const botToken = process.env.DISCORD_TOKEN;

const sendMessage = async (channel: Channel, message: string) => {
    try {
        if (channel?.isTextBased()) {
            await channel.send(message)
            logger.info(message)
        }
    } catch (error) {
        logger.error(error)
    }
}

const app = async () => {

    logger.log("Starting process...")

    const repository = new TelegramAlertsRepository()

    const data = await repository.getTelegramAlerts()

    const client = new Client({
        intents: [IntentsBitField.Flags.GuildMessages]
    });

    try {
        
        await client.login(botToken);
        
        client.on("ready", async () => {
            try {
                if (data.length) {

                    const messagesPromises = data.map(async (el) => {
                        const channel = await client.channels.fetch(el.getChatId());
                        if (channel) {
                            await sendMessage(channel, el.getMessage());
                        } else {
                            logger.info("Not channel found")
                        }
                    })

                    await Promise.all(messagesPromises)

                    logger.info("All messages were sent")
                    
                    await client.destroy()

                    process.exit(0)
                    
                }
            } catch (error) {
                logger.error(error)
            }
        })

    } catch (error) {
        console.log(error)
    } 

}

app()