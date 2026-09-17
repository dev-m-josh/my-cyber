import express from "express";

import customersRoutes from "./customers/customers.routes";

const app = express();

app.use(express.json());

app.use("/customers", customersRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});