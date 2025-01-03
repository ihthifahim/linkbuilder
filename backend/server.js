const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const sequelize = require('./config/sequelize');

dotenv.config();

const app = express();

const corsOptions = {
    origin: ['https://app.gumly.co', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
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
