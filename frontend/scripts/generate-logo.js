const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a canvas
const width = 200;
const height = 200;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Create a circular gradient background
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#3B82F6'); // Blue
gradient.addColorStop(1, '#10B981'); // Green

// Draw circle with gradient
ctx.beginPath();
ctx.arc(width / 2, height / 2, width / 2 - 10, 0, Math.PI * 2);
ctx.fillStyle = gradient;
ctx.fill();

// Add text
ctx.font = 'bold 100px Arial';
ctx.fillStyle = 'white';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('L', width / 2, height / 2);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./frontend/public/logo.png', buffer);

console.log('Logo generated successfully at frontend/public/logo.png');
