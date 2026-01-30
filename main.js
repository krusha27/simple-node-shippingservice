const express = require('express');
const axios = require('axios');

const customerServiceUrl = 'http://192.168.31.xx:5000/customer/info';

const app = express();
const port = 4000;

app.get('/shipping/cost/:id', async (req, res) => {
    const orderId = req.params.id;
    const countryVsTax = {
        'USA': 20,
        'Canada': 25
    };
    const standardPrice = 50;

    try {
    const customerInfoResponse = await axios.get(`${customerServiceUrl}/${orderId}`);
    const tax = countryVsTax[customerInfoResponse.data.country] ?? 0;
    const shippingPrice = standardPrice + tax;
    res.json(shippingPrice);
} catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });   
}
});

app.listen(port, () => {
    console.log(`ShippingService running at ${port}`);
});