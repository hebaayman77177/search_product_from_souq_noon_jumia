const express = require("express");
var cors = require('cors');
// routers
const productRouter = require("./routes/productRoutes");


const app = express();
//allow cors
app.use(cors());
//parse the body of the request and add it in req.body
app.use(express.json({ limit: "10kb" }));

// mount routes
app.use("/api/v1/products", productRouter);
app.use(function (err, req, res, next) {
  res.status(500).json({err});
})

app.listen(3000, () => {
    console.log(`server is running on port 3000`);
  });
