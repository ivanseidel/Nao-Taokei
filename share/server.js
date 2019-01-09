const fs = require('fs');
const path = require('path');
const async = require('async');
const express = require('express');
const compression = require('compression');
const apicache = require('apicache').middleware;
const handlebars = require('handlebars');
const request = require('request');

// Expose global app object
var app = {};
global.app = app;

// Load template
var template = handlebars.compile(fs.readFileSync('index.html').toString());

// Home Page
var home = template({
  url: 'http://agorailegal.com',
  site: 'AgoraIlegal',
  title: 'Agora é Ilegal',
  gif_url: 'http://agorailegal.com',
  description: 'Declare coisas ilegais e o Bolsonaro irá assinar',
  content_type: 'website',
});

//
// Start HTTP server
//
app.express = express();
app.express.use(compression());
app.express.use(express.static('public'))

// Set engine
app.express.set('view engine', 'handlebars');

app.express.get('/', (req, res) => {
  res.redirect('http://agorailegal.com');
});

app.express.get('/:gif.gif', apicache('10 minutes'), (req, res) => {
  const word = req.params.gif || '';
  const filename = word.toUpperCase();
  const uri = `https://storage.googleapis.com/agorailegal.appspot.com/gifs/${filename}.gif`;

  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.redirect(301, uri);
});

app.express.get('/:gif', apicache('10 minutes'), (req, res) => {
  const word = req.params.gif || '';
  const filename = word.toUpperCase();

  // const uri = `http://share.agorailegal.com/${filename}.gif`
  const uri = `https://storage.googleapis.com/agorailegal.appspot.com/gifs/${filename}.gif`;

  res.status(200).send(
    template({
      url: uri,
      site: 'AgoraIlegal',
      title: `${word} Agora é Ilegal!`,
      gif_url: uri,
      // TODO: this should be dynamic
      gif_preview_url: 'http://share.agorailegal.com/preview.png',
      description: 'Declare coisas ilegais e o Bolsonaro irá assinar',
      content_type: 'video.other',
      share_url: `http://agorailegal.com/?${word}`,
    })
  );
});

const PORT = process.env.PORT || 8080;
app.express.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
