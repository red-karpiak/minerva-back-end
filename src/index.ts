import { createApp } from "./createApp";
import * as dotenv from "dotenv";
dotenv.config();

const app = createApp();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
