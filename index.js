import express from 'express';
import { isWinner, play } from './slotMachine.js';

const PORT = 8080;

const app = express();

app.get('/play', (req, res) => {
  const result = play();
  const response = {
    reels: result,
    win: isWinner(result)
  };
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});