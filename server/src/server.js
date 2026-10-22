import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import app from "./app/app.js";
import config from "./config/config.js";
import connectDB from "./config/db.js";

const PORT = config.PORT|| 4000


await connectDB()

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
    
})