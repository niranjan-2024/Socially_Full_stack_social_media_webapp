//4nhbeGU2KJ3TRizO

const express = require('express');
const dotenv = require('dotenv');
dotenv.config('./.env');

const dbConnect = require('./dbConnect');
const authRouter = require('./routers/authRouter')
const postsRouter = require('./routers/postsRouter');
const userRouter = require('./routers/userRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const cloudinary = require('cloudinary').v2;


const morgan = require('morgan');

cloudinary.config({
    cloud_name: "dckpsrvgp",
    api_key:"158944482284432",
    api_secret:"435bBvwocJx7AB9NO4J5RGUkQOU"
});

const app = express();

//middlewares
app.use(express.json({limit: "10mb"}));
app.use(morgan('common'));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));

const PORT = process.env.PORT || 4001;

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/user' , userRouter);

app.get('/', (req,res) => {
    res.status(200).send("OK from Server");
})

dbConnect();
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

