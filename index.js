import express from 'express';
import cookieParser from 'cookie-parser';
import { play, getResult } from './app.js';
import { createHash } from 'crypto';

const PORT = 8080;

const app = express();

const credits = new Map();

// Very insecure id generation.
function generateInsecureId() {
  return createHash('sha256').update(Math.random().toString()).digest('hex');
}

app.use(cookieParser());
app.use((req, res, next) => {
  if(!req.cookies.fruitmachine) {
    const hash = generateInsecureId();
    res.cookie('fruitmachine', hash, {
      httpOnly: true
    });
    credits.set(hash, 10);
  }
  res.locals.id = req.cookies.fruitmachine;
  next();
});

app.get('/play', (req, res) => {
  if(credits.get(res.locals.id) <= 0) {
    res.status(404)
      .json({ error: "insufficient credits" });
    return;
  }

  const game = play();
  const { win, balance } = getResult(game, credits.get(res.locals.id));
  credits.set(res.locals.id, balance);

  const response = {
    reels: game,
    win,
    credits: balance
  };
  res.json(response);
});

app.get('/balance', (req, res) => {
  const response = {
    credits: credits.get(res.locals.id)
  };
  res.json(response);
});

app.use('/', express.static('static'));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

/*
1. Have I been here before?
2 N) Assign a unique identifier & give you a cookie
2 Y) Use that cookie as a key a data store.
*/