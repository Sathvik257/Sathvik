const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Ensure images directory exists
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

const projects = [
    { name: 'ai-resume-maker', title: 'AI Resume Maker', color: '#667eea', subtitle: 'React + AI' },
    { name: 'battleship-game', title: 'Battleship Game', color: '#764ba2', subtitle: 'C++ Algorithm' },
    { name: 'smart-home-automation', title: 'Smart Home Automation', color: '#f093fb', subtitle: 'Python + Voice' },
    { name: 'movie-ticket-booking', title: 'Movie Ticket Booking', color: '#4facfe', subtitle: 'Full Stack' }
];

function generateImage(project) {
    const canvas = createCanvas(400, 200);
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 400, 200);
    gradient.addColorStop(0, project.color);
    gradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 200);

    // Add overlay for better text readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, 400, 200);

    // Add text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(project.title, 200, 80);

    // Add subtitle
    ctx.font = '18px Arial';
    ctx.fillText(project.subtitle, 200, 120);

    // Add icon or symbol
    ctx.font = '48px Arial';
    ctx.fillText('💻', 200, 160);

    // Save the image
    const buffer = canvas.toBuffer('image/jpeg');
    const filePath = path.join(imagesDir, `${project.name}.jpg`);
    fs.writeFileSync(filePath, buffer);
    console.log(`Generated: ${project.name}.jpg`);
}

console.log('Generating project images...');
projects.forEach(generateImage);
console.log('All images generated successfully!'); 