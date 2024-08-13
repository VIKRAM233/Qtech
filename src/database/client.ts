import mongoose, { Connection } from "mongoose";
class Client {
  private static instance: Client;
  private connection: Connection | null = null;
  private constructor() {}
  public static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }
    return Client.instance;
  }
  public async connect(uri: string): Promise<Connection> {
    if (!this.connection) {
      try {
        await mongoose.connect(uri);
        this.connection = mongoose.connection;
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      }
    }
    return this.connection;
  }
  public getConnection(): Connection | null {
    return this.connection;
  }
}
export default Client;