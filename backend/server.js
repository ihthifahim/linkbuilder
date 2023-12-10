const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./config/sequelize');

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Import Main Routes
const mainRoutes = require('./routes/mainRoutes');


app.get('/', (req, res) => {
    res.json({
        "hello": "world"
    })
})

//All Routes
app.use('/api', mainRoutes);



const port = process.env.PORT;
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced successfully');
    // Start Express Server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});



// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//     console.log(process.env)
// });