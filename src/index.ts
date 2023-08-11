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
            channel.send(message)
            logger.info(message)
            logger.info("Alert sent")
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
        intents: [IntentsBitField.Flags.GuildMessages], // Ante qué eventos responderá
    });

    try {
        await client.login(botToken);

        client.on("ready", async () => {
            try {
                if (data.length) {
                    data.forEach(async (el) => {
                        const channel = await client.channels.fetch(el.getChatId());
                        if (channel) {
                            await sendMessage(channel, el.getMessage());
                        }
                    })
                }
            } catch (error) {
                logger.error(error)
            }
        })

    } catch (error) {
        console.log(error)
    } finally {
        console.log("Process finished")
    }

}

app()