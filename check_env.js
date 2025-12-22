import fs from 'fs'
import path from 'path'

const envPath = path.resolve(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8')
  envConfig.split('\n').forEach(line => {
    const [k, v] = line.split('=')
    if (k && k.trim()) {
      console.log('Found key:', k.trim())
    }
  })
}
