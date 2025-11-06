import express from 'express';
import 'dotenv/config'
import {sequelize} from './config/db.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import ErrorMiddleware from './middlewares/error-middleware.js'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


// webhokk
// app.post("/api/paypal/webhook", bodyParser.raw({ type: "application/json" }), handlePayPalWebhook);

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send("Server is running at port 5005");
});


app.use(ErrorMiddleware);

(async function ServerStart() {
  try {
    // DB connected
    await sequelize.authenticate();
    console.log("db connected");

    app.listen(PORT, () => {
      console.log(" Server is running at " + PORT);
    });

  } catch (error) {
    console.log("Error: ", error);
  }
})();
