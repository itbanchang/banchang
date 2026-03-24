import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import { getRevenueFiscal } from '../helpers/fiscal.js';

const router = Router();



export default router;
