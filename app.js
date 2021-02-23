import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import bodyparser from 'body-parser';


const app = express();

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(cors({
  origin: '*',
  credentials: true,
  exposedHeaders: ['Content-Disposition']
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
// Rutas
/* app.get('/', (req, res) => {
  res.send('Hello World!');
}); */
app.use('/api', require('./routes/ytdl'));



// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('App listening on port : '+ app.get('puerto'));
});

