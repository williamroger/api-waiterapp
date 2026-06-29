import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';

import { router } from './router';

const currentDir = import.meta.dirname;

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const port = 3001;

    app.use('/uploads', express.static(path.resolve(currentDir, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });

    console.log('Conectado ao MongoDB.');
  })
  .catch(() => console.log('Erro ao tentar conectar com o MongoDB.'));
