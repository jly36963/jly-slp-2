// imports
import express from 'express';
const router = express.Router();
import qs from 'qs';
import axios from 'axios';
import cheerio from 'cheerio';
import checkToken from '../../middleware/check-token';

// genius token
const geniusToken: string = process.env.GENIUS_TOKEN;

// @route -- GET /api/genius/lyrics-path
// @desc -- get genius path
// @access -- protected

router.get('/lyrics-path', checkToken, async (req, res) => {
  try {
    // get query
    const { songName, artistName }: qs.ParsedQs = req.query;
    // get config for request
    const songQS: string = qs.stringify({ q: `${songName} ${artistName}` });
    const url: string = `https://api.genius.com/search?${songQS}`;
    const headers = {
      Authorization: `Bearer ${geniusToken}`,
    };
    // genius request
    const geniusResponse = await axios({
      method: 'get',
      url,
      headers,
    });
    const { hits } = geniusResponse.data.response;
    const song = hits[0].result;
    // response
    return res.status(200).json({ song });
  } catch (err) {
    console.log(err.message);
    return res.status(500);
  }
});

// @route -- GET /api/genius/lyrics
// @desc -- get lyrics using lyrics_path
// @access -- protected

router.get('/lyrics', checkToken, async (req, res) => {
  try {
    // get query
    const { lyrics_path }: qs.ParsedQs = req.query;
    // config
    let headers = { Authorization: `Bearer ${geniusToken}` };
    const url: string = `https://genius.com${lyrics_path}`;
    // genius request
    const response = await axios({
      method: 'get',
      url,
      headers,
    });
    const html: string = response.data;
    // parse html
    const $: cheerio.Root = cheerio.load(html);
    const lyrics: string = $('.lyrics').text();
    // response
    return res.status(200).json({ lyrics });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

export default router;
