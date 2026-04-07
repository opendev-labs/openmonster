export class DiscordChannel {
    public isConnected: boolean = false;
    private botToken: string;

    constructor(token: string = process.env.DISCORD_TOKEN || '') {
        this.botToken = token;
    }
    
    async connect(): Promise<boolean> {
        if (this.botToken) this.isConnected = true;
        console.log("Discord Channel Connected.");
        return this.isConnected;
    }

    async sendMessage(channelId: string, message: string): Promise<void> {
        if (!this.isConnected) throw new Error("Discord not connected");
        console.log(`Sending Discord message to ${channelId}: ${message}`);
    }
}
