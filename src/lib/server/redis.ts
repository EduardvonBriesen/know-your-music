import { Redis } from 'ioredis';
import { VITE_REDIS_URI } from '$env/static/private';

export const redis = new Redis(VITE_REDIS_URI);
