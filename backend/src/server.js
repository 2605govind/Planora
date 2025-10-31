import express from 'express';
import 'dotenv/config'
import sequelize from './config/dg.js'
import authRouter from './Routers/authRouter.js';
import publicRouter from './Routers/publicRouter.js';
import adminRouter from './Routers/adminRouter.js';
import userRouter from './Routers/userRouter.js';
import planRoutes from './Routers/planRoutes.js';
import paypalRoutes from './Routers/paypalRoutes.js';
import cookieParser from 'cookie-parser';
import './Model/associations.js'
import cors from 'cors';

import { handlePayPalWebhook } from './Controller/paypalController.js';
import bodyParser from "body-parser";

import './services/scheduleService.js'


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


// webhokk
app.post("/api/paypal/webhook", bodyParser.raw({ type: "application/json" }), handlePayPalWebhook);

app.use(express.json());
app.use(cookieParser());

// auth
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/plan', planRoutes);
app.use("/api/paypal", paypalRoutes);
app.use('/api', publicRouter)


app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  res.status(err.statusCode || 500).json({ 
    success: false,
    message: err.message || 'Internal Server Error',
  });
})

app.get('/', (req, res) => {
  res.send("Server is running at port 5001");
});



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
