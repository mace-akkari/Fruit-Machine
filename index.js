import express from 'express';
import { play, getResult } from './app.js';

const PORT = 8080;

const app = express();

const credits = new Map()

// @TODO: TEST STUFF, REMOVE
const FAKEID = "abcdef";
credits.set(FAKEID, 10);
// END


app.get('/play', (req, res) => {
  if(credits.get(FAKEID) <= 0) {
    res.status(404)
      .json({ error: "insufficient credits" });
    return;
  }

  const game = play();
  const { win, balance } = getResult(game, credits.get(FAKEID));
  credits.set(FAKEID, balance);

  const response = {
    reels: game,
    win,
    credits: balance
  };
  res.json(response);
});

app.get('/balance', (req, res) => {
  const response = {
    credits: credits.get(FAKEID)
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