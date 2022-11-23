import Mock from 'mockjs';
import { isDev } from '@/utils/env';

import './card.ts';

if (!isDev) {
  Mock.setup({
    timeout: '600-1000'
  });
}

console.log(import.meta.env);
