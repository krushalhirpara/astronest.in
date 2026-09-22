import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import fs from 'fs';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Load environment variables from root .env or server .env
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable HTTP compression for all responses (Gzip / Deflate)
app.use(compression());

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to reliably resolve client/dist across local & Railway environments
function findClientDist(): string {
  const candidatePaths = [
    path.resolve(process.cwd(), 'client/dist'),
    path.resolve(process.cwd(), '../client/dist'),
    path.resolve(__dirname, '../client/dist'),
    path.resolve(__dirname, '../../client/dist'),
    path.resolve(__dirname, '../../../client/dist'),
    path.resolve(process.env.INIT_CWD || '', 'client/dist'),
  ];

  for (const candidate of candidatePaths) {
    if (candidate && fs.existsSync(path.join(candidate, 'index.html'))) {
      console.log(`[Server] Found client build at: ${candidate}`);
      return candidate;
    }
  }

  // Upward traversal from __dirname
  let curr = __dirname;
  for (let i = 0; i < 5; i++) {
    const testPath = path.join(curr, 'client/dist');
    if (fs.existsSync(path.join(testPath, 'index.html'))) {
      console.log(`[Server] Found client build via __dirname traversal at: ${testPath}`);
      return testPath;
    }
    const parent = path.dirname(curr);
    if (parent === curr) break;
    curr = parent;
  }

  // Upward traversal from process.cwd()
  curr = process.cwd();
  for (let i = 0; i < 5; i++) {
    const testPath = path.join(curr, 'client/dist');
    if (fs.existsSync(path.join(testPath, 'index.html'))) {
      console.log(`[Server] Found client build via process.cwd() traversal at: ${testPath}`);
      return testPath;
    }
    const parent = path.dirname(curr);
    if (parent === curr) break;
    curr = parent;
  }

  const defaultFallback = path.resolve(process.cwd(), 'client/dist');
  console.warn(`[Server Warning] client/dist/index.html not found. Defaulting path to: ${defaultFallback}`);
  return defaultFallback;
}

const clientDistPath = findClientDist();

// Register Express static middleware with production caching strategy
if (fs.existsSync(clientDistPath)) {
  app.use(
    express.static(clientDistPath, {
      setHeaders: (res, filePath) => {
        // Vite hashed assets in /assets/ get 1-year immutable caching
        if (filePath.includes(path.sep + 'assets' + path.sep) || filePath.includes('/assets/')) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        }
      },
    })
  );
}

// Lazy client initializers for instant cold start
let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return _openai;
}

let _razorpay: Razorpay | null = null;
function getRazorpay(): Razorpay {
  if (!_razorpay) {
    _razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    });
  }
  return _razorpay;
}

// Ensure API routes are never cached by CDNs or proxies
app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Backend API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AstroNest API is operational' });
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

    const openaiClient = getOpenAI();
    const response = await openaiClient.chat.completions.create({
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

    const razorpayClient = getRazorpay();
    const order = await razorpayClient.orders.create(options);
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

// Catch-all for unhandled API requests (all HTTP methods)
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Explicit handler for robots.txt
app.get('/robots.txt', (req, res) => {
  const robotsPath = path.join(clientDistPath, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.sendFile(robotsPath);
  }
  res.type('text/plain').send("User-agent: *\nAllow: /\nDisallow: /login\nDisallow: /signup\nDisallow: /forgot-password\nDisallow: /reset-password\nDisallow: /api/\n\nSitemap: https://astronest.in/sitemap.xml\n");
});

// Explicit handler for sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const sitemapPath = path.join(clientDistPath, 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.sendFile(sitemapPath);
  }
  res.status(404).send('Sitemap not found');
});

// SPA Routing Fallback: serve index.html for all frontend GET requests
app.get('*', (req, res) => {
  const indexPath = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.sendFile(indexPath);
  } else {
    return res.status(500).send('Production build error: client/dist/index.html not found on server.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

