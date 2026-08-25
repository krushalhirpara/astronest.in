import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';
import Razorpay from 'razorpay';
import crypto from 'crypto';


// Load environment variables from root .env
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // In production, you should restrict this to your frontend URL
app.use(express.json());

// Resolve client/dist path for serving production frontend
const clientDistPath = [
  path.resolve(process.cwd(), 'client/dist'),
  path.join(__dirname, '../client/dist'),
  path.join(__dirname, '../../client/dist')
].find(p => fs.existsSync(p)) || path.resolve(process.cwd(), 'client/dist');

if (fs.existsSync(clientDistPath)) {
  console.log(`Serving static files from: ${clientDistPath}`);
  app.use(express.static(clientDistPath));
} else {
  console.warn(`Warning: Client dist directory not found at ${clientDistPath}`);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AstroNest Backend is running! 🚀' });
});

// OpenAI Chat Endpoint
app.post('/api/chat', async (req: any, res: any) => {
  try {
    const { message, history, systemPrompt, response_format } = req.body;

    if (!message && !history) {
      return res.status(400).json({ error: "Message or history is required." });
    }

    const messages: any[] = [];
    
    // Add system prompt if provided
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    } else {
      messages.push({ role: "system", content: "You are a professional Vedic astrologer AI." });
    }

    // Add history if provided
    if (history && Array.isArray(history)) {
      messages.push(...history);
    }

    // Add current message if provided
    if (message) {
      messages.push({ role: "user", content: message });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      response_format: response_format || { type: "text" }
    });

    const reply = response.choices[0]?.message?.content;
    
    // Try to parse as JSON if response_format is json_object
    if (response_format && response_format.type === "json_object") {
      try {
        return res.json(JSON.parse(reply || "{}"));
      } catch (e) {
        return res.json({ reply });
      }
    }

    res.json({ reply });
  } catch (error: any) {
    console.error("AI Error:", error);
    res.status(500).json({ 
      error: "Apologies, the cosmic connection was interrupted.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Razorpay: Create Order
app.post('/api/payment/create-order', async (req: any, res: any) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error: any) {
    console.error('Razorpay Order Error:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Razorpay: Verify Payment
app.post('/api/payment/verify', async (req: any, res: any) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment details" });
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      return res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid signature sent!' });
    }
  } catch (error: any) {
    console.error('Razorpay Verify Error:', error);
    res.status(500).json({ 
      error: 'Verification failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// SPA routing fallback: serve index.html for non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('AstroNest Backend is running! (Frontend build not found)');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
