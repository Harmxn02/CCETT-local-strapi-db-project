const axios = require("axios");

// Strapi API endpoint for DetectionLog collection
const API_URL = "http://localhost:1337/api/detection-logs"; // Adjust endpoint if needed
const ACCESS_TOKEN = "528330dd9835ac1a09969390f54d9de9826ad3131e936a387b5fed5649e3a86ed67c4db04cb477cb7ad7908b20bc96cd6285f5406696f544953873732f59f09f37bf2d263b88d4aa5c951238337ed4747891c2e7503a078b1a5e2aa4431bdb280cea0b259a61d086ee3fe3df5d5af2681224ea3a2180c06ee99629969d3a1ff7"; // Replace with your token if authentication is required

async function addDetectionLogs() {
    const baseDate = new Date('2024-12-28T00:00:00');
    const entries = [];
  
    // Generate dummy data with seconds precision
    for (let i = 0; i < 100; i++) {
      const timestamp = new Date(baseDate.getTime() + i * 3000).toISOString(); // Increment by 3 seconds
      const detectionstatus = Math.random() > 0.8 ? 'Human detected' : ''; // 20% chance to assign status 'Human detected'
      entries.push({ Timestamp: timestamp, Detectionstatus: detectionstatus });
    }
  
    // Insert data via Strapi API
    for (const entry of entries) {
      try {
        const response = await axios.post(
          API_URL,
          { data: entry },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        console.log(`Inserted entry: ${entry.Timestamp} - ${entry.Detectionstatus}`);
      } catch (error) {
        console.error(
          `Error inserting entry: ${entry.Timestamp}`,
          error.response?.data || error.message
        );
      }
    }
  }
  
  // Run the script
  addDetectionLogs();