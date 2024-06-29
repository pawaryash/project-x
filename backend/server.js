//importing express for starting the server

const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling uncaught exceptions
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to an Uncaught Exception");

    process.exit(1);
    
});

//config the env file
dotenv.config({path: "backend/config/config.env"});

//connecting to database
connectDatabase()

//serving the landing page
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});



//Unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
});