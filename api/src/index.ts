import express from "express";

import authRoutes from "./auth/auth.routes";
import customersRoutes from "./customers/customers.routes";
import usersRoutes from "./users/users.routes";
import servicesRoutes from "./services/services.routes";
import productsRoutes from "./products/products.routes";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/customers", customersRoutes);
app.use("/services", servicesRoutes);
app.use("/products", productsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});