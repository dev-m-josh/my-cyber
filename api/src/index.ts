import express from "express";

import authRoutes from "./auth/auth.routes";
import customersRoutes from "./customers/customers.routes";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/customers", customersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});