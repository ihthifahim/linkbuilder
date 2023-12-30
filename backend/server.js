const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const sequelize = require('./config/sequelize');

const {createClient} = require('redis');
const { promisify } = require('util');

// Assuming you've created a Redis client with `createClient()`
const client = createClient ({
    url : "rediss://default:c2eea34c9302459386fa998e6355dc82@key-egret-49749.upstash.io:49749"
  });

// Promisify the get and setex methods
const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.set).bind(client);

const router = express.Router();

const LinkTraffic = require('./db/models/LinkTraffic')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import Main Routes
const mainRoutes = require('./routes/mainRoutes');
const mainLinkRoutes = require('./routes/mainLinkRoute');


// app.get('/testredis', async (req, res) => {
//     try{
//         client.connect();
//         const cachedData = await client.get('test');
//         if(cachedData){
//             res.status(200).json({cachedData});
//             console.log({cached: cachedData});
//         } else {
//             client.set('test', 'Hello this is a cached item')
//             console.log("Not cached")
//         }
//     }catch(error){
//         console.log(error)
//     } finally{
//         client.quit();
//     }
    

// })

app.get('/testredis', async (req, res) => {
    client.on("error", function(err) {
        throw err;
      });
      await client.connect()
      await client.set('foo','bar');
});



app.use('/', mainLinkRoutes)


app.get('/', (req, res) => {
    res.redirect('https://gumly.co');
})

//All Routes
app.use('/api', mainRoutes);



const port = process.env.PORT;
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced successfully');
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});






// LinkTraffic.sync()
//     .then(() => {
//         console.log('Links table synced successfully');
//     })
//     .catch((error) => {
//         console.error('Error syncing Links table:', error);
//     });