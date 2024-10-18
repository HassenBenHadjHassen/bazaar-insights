import "reflect-metadata";
import app from "./app";
import dotenv from "dotenv";
import { Datasource } from "./data/datasource";

dotenv.config();

const PORT = process.env.PORT || 3000;

const datasource = new Datasource();

async function startServer() {
  try {
    await datasource.connect();
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  try {
    await datasource.disconnect();
    console.log("Gracefully disconnected from the database");
    process.exit(0);
  } catch (error) {
    console.error("Error during disconnect:", error);
    process.exit(1);
  }
});

startServer();
