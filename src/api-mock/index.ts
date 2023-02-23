import Mock from 'mockjs';
import { isDev } from '@/utils/env';

import './card.ts';

if (!isDev) {
  Mock.setup({
    timeout: '100-500'
  });
}

console.log(import.meta.env);
