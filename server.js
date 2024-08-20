const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Route for Diameter & Velocity calculation
app.post('/calculate-diameter-velocity', (req, res) => {
    const { diameter, velocity, diameterUnit, velocityUnit } = req.body;

    let diameterInMeters = convertToMeters(diameter, diameterUnit);
    let velocityInMetersPerSecond = convertToMetersPerSecond(velocity, velocityUnit);

    const flowRateCubicMetersPerSecond = Math.PI * Math.pow(diameterInMeters / 2, 2) * velocityInMetersPerSecond;

    const result = {
        ft3_sec: (flowRateCubicMetersPerSecond * 35.3147).toFixed(4),
        ft3_min: (flowRateCubicMetersPerSecond * 35.3147 * 60).toFixed(4),
        ft3_hr: (flowRateCubicMetersPerSecond * 35.3147 * 3600).toFixed(4),
        gal_sec: (flowRateCubicMetersPerSecond * 264.172).toFixed(4),
        gal_min: (flowRateCubicMetersPerSecond * 264.172 * 60).toFixed(4),
        gal_hr: (flowRateCubicMetersPerSecond * 264.172 * 3600).toFixed(4),
        m3_sec: flowRateCubicMetersPerSecond.toFixed(4),
        l_sec: (flowRateCubicMetersPerSecond * 1000).toFixed(4),
        m3_min: (flowRateCubicMetersPerSecond * 60).toFixed(4),
        l_min: (flowRateCubicMetersPerSecond * 1000 * 60).toFixed(4),
        m3_hr: (flowRateCubicMetersPerSecond * 3600).toFixed(4),
        l_hr: (flowRateCubicMetersPerSecond * 1000 * 3600).toFixed(4)
    };

    res.json(result);
});

// Route for Volume & Time calculation
app.post('/calculate-volume-time', (req, res) => {
    const { volume, time, volumeUnit, timeUnit } = req.body;

    let volumeInCubicMeters = convertToCubicMeters(volume, volumeUnit);
    let timeInSeconds = convertToSeconds(time, timeUnit);

    const flowRateCubicMetersPerSecond = volumeInCubicMeters / timeInSeconds;

    const result = {
        ft3_sec: (flowRateCubicMetersPerSecond * 35.3147).toFixed(4),
        ft3_min: (flowRateCubicMetersPerSecond * 35.3147 * 60).toFixed(4),
        ft3_hr: (flowRateCubicMetersPerSecond * 35.3147 * 3600).toFixed(4),
        gal_sec: (flowRateCubicMetersPerSecond * 264.172).toFixed(4),
        gal_min: (flowRateCubicMetersPerSecond * 264.172 * 60).toFixed(4),
        gal_hr: (flowRateCubicMetersPerSecond * 264.172 * 3600).toFixed(4),
        m3_sec: flowRateCubicMetersPerSecond.toFixed(4),
        l_sec: (flowRateCubicMetersPerSecond * 1000).toFixed(4),
        m3_min: (flowRateCubicMetersPerSecond * 60).toFixed(4),
        l_min: (flowRateCubicMetersPerSecond * 1000 * 60).toFixed(4),
        m3_hr: (flowRateCubicMetersPerSecond * 3600).toFixed(4),
        l_hr: (flowRateCubicMetersPerSecond * 1000 * 3600).toFixed(4)
    };

    res.json(result);
});

// Route for Rectangular Shape calculation
app.post('/calculate-rectangular', (req, res) => {
    const { width, height, velocity, widthUnit, heightUnit, velocityUnit } = req.body;

    let widthInMeters = convertToMeters(width, widthUnit);
    let heightInMeters = convertToMeters(height, heightUnit);
    let velocityInMetersPerSecond = convertToMetersPerSecond(velocity, velocityUnit);

    const flowRateCubicMetersPerSecond = widthInMeters * heightInMeters * velocityInMetersPerSecond;

    const result = {
        ft3_sec: (flowRateCubicMetersPerSecond * 35.3147).toFixed(4),
        ft3_min: (flowRateCubicMetersPerSecond * 35.3147 * 60).toFixed(4),
        ft3_hr: (flowRateCubicMetersPerSecond * 35.3147 * 3600).toFixed(4),
        gal_sec: (flowRateCubicMetersPerSecond * 264.172).toFixed(4),
        gal_min: (flowRateCubicMetersPerSecond * 264.172 * 60).toFixed(4),
        gal_hr: (flowRateCubicMetersPerSecond * 264.172 * 3600).toFixed(4),
        m3_sec: flowRateCubicMetersPerSecond.toFixed(4),
        l_sec: (flowRateCubicMetersPerSecond * 1000).toFixed(4),
        m3_min: (flowRateCubicMetersPerSecond * 60).toFixed(4),
        l_min: (flowRateCubicMetersPerSecond * 1000 * 60).toFixed(4),
        m3_hr: (flowRateCubicMetersPerSecond * 3600).toFixed(4),
        l_hr: (flowRateCubicMetersPerSecond * 1000 * 3600).toFixed(4)
    };

    res.json(result);
});

function convertToMeters(value, unit) {
    switch (unit) {
        case 'inches': return value * 0.0254;
        case 'feet': return value * 0.3048;
        case 'yards': return value * 0.9144;
        case 'millimeters': return value * 0.001;
        case 'centimeters': return value * 0.01;
        case 'meters': return value;
        default: return value;
    }
}

function convertToMetersPerSecond(value, unit) {
    return unit === 'ft/s' ? value * 0.3048 : value;
}

function convertToCubicMeters(value, unit) {
    switch (unit) {
        case 'fluid ounces': return value * 2.9574e-5;
        case 'quarts': return value * 0.00113652;
        case 'pints': return value * 0.000568261;
        case 'gallons': return value * 0.00378541;
        case 'milliliters': return value * 1e-6;
        case 'liters': return value * 0.001;
        case 'cubic inches': return value * 1.6387e-5;
        case 'cubic feet': return value * 0.0283168;
        default: return value;
    }
}

function convertToSeconds(value, unit) {
    switch (unit) {
        case 'minutes': return value * 60;
        case 'hours': return value * 3600;
        case 'days': return value * 86400;
        case 'seconds': return value;
        default: return value;
    }
}

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
