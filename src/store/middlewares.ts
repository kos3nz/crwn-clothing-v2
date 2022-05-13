import { type Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default middlewares;
