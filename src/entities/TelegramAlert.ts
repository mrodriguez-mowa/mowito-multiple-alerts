interface IProcessEnv {
    [key: string]: string | undefined;
}

export default class TelegramAlert {
    private id: number
    private chatId: string
    private description: string
    private message: string

    constructor(id: number, chatId: string, description: string, message: string) {
        this.id = id,
            this.chatId = chatId,
            this.description = description,
            this.message = message
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getChatId(): string {
        // -1001417598623 Sistemas - Comercial
        // -1001449756165 Sistemas - Soporte
        // -1001650274808 Alerta Cuentas-Soporte
        // -648599413 Alerta - Dev
        // -1001884412862 Alertas Isoluciones
        // -859053868 Alertas test

        const discordTable:any = {
            '-1001417598623': process.env.SISTEMAS_COMERCIAL as string,
            '-1001449756165': process.env.SISTEMAS_SOPORTE as string,
            '-1001650274808': process.env.CUENTAS_SOPORTE as string,
        }
        const channelId = discordTable[this.chatId.toString()] ? discordTable[this.chatId.toString()] : process.env.DEV_BOT as string

        return channelId;
    }

    public setChatId(chatId: string): void {
        this.chatId = chatId;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getMessage(): string {
        return this.message;
    }

    public setMessage(message: string): void {
        this.message = message;
    }




}

