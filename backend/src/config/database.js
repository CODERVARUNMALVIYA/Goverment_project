const mongoose = require('mongoose');

/**
 * Database configuration and connection handler
 */
class Database {
  constructor() {
    this.mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mgnrega';
    this.maxRetries = 3;
    this.retryCount = 0;
  }

  /**
   * Connect to MongoDB with retry logic
   */
  async connect() {
    try {
      await mongoose.connect(this.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
      });
      
      console.log('✓ MongoDB connected successfully');
      this.retryCount = 0;
      
      // Handle connection events
      this.setupEventHandlers();
      
    } catch (err) {
      console.error('✗ MongoDB connection error:', err.message);
      
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`Retrying connection (${this.retryCount}/${this.maxRetries}) in 5s...`);
        await this.delay(5000);
        return this.connect();
      } else {
        console.error('Max retries reached. Please check MongoDB is running.');
        throw err;
      }
    }
  }

  /**
   * Setup MongoDB event handlers
   */
  setupEventHandlers() {
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✓ MongoDB reconnected');
    });
  }

  /**
   * Disconnect from MongoDB
   */
  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
    } catch (err) {
      console.error('Error disconnecting from MongoDB:', err);
      throw err;
    }
  }

  /**
   * Check database connection status
   */
  isConnected() {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Delay helper function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new Database();
