const express = require("express");
const stripe = require("stripe")("sk_test_51QH4YuGKhpG51U1yNuDVaKHXV70e88uJLgPJvKey1Z8kWMKDwC2Op7QgXmTx82czDlxarMv0KMHb6zEzpLowUHu50090ckfCNA"); // Replace with your Stripe secret key
const cors = require("cors"); // To handle CORS if needed
const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Payment Intent Endpoint
app.post("/create-payment-intent", async (req, res) => {
    const { amount } = req.body; // Expecting the amount to be sent from the frontend

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents (e.g., 750 for SGD 7.50)
            currency: "sgd", // Your currency
        });

        // Send the client secret to the frontend
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).send({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

