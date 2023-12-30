const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const sequelize = require('./config/sequelize');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import Main Routes
const mainRoutes = require('./routes/mainRoutes');
const mainLinkRoutes = require('./routes/mainLinkRoute');


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