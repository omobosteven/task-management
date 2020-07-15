import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { sequelize } from './database/models';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(routes);

app.use((error, req, res, next) => {
  if (!error.statusCode) {
    error.statusCode = 500;
    error.errorMessage = 'Internal server error!';
  }
  // console.log({ error: error.message });

  return res.status(error.statusCode).send({
    success: false,
    error: error.statusCode === 422 ? error.data.error : error.errorMessage
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database Connection has been established successfully.');

    app.listen(process.env.PORT, () =>
      console.log(`App listening on port ${process.env.PORT}!`)
    );
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// eslint-disable-next-line spaced-comment
//FIXME What's next
// - Add JWT Token generation
// - Register with external account [google, github]
