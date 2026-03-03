import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  const html = readFileSync(
    join(process.cwd(), 'app/app/blog/best-yuka-alternative/yuka-alternative.html'),
    'utf-8'
  );

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
