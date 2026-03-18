import { readFileSync } from 'fs'
import { join } from 'path'

export default function Page() {
  const html = readFileSync(
    join(process.cwd(), 'app/app/blog/allergy-ingredient-checker/allergy-ingredient-checker.html'),
    'utf-8'
  )

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
