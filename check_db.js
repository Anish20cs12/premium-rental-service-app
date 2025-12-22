import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

console.log('Starting script...')

// Load env vars manually
const envPath = path.resolve(process.cwd(), '.env')
let url = process.env.VITE_SUPABASE_URL
let key = process.env.VITE_SUPABASE_ANON_KEY

console.log('Reading .env from:', envPath)
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8')
  envConfig.split('\n').forEach(line => {
    const [k, v] = line.split('=')
    if (k && v) {
      if (k.trim() === 'VITE_SUPABASE_URL') url = v.trim()
      if (k.trim() === 'VITE_SUPABASE_ANON_KEY') key = v.trim()
    }
  })
}

if (!url || !key) {
  console.error('Missing env vars. URL:', !!url, 'Key:', !!key)
  process.exit(1)
}

console.log('Connecting to Supabase...')
const supabase = createClient(url, key)

async function check() {
  console.log('Querying cars...')
  const { data: cars, error: e1 } = await supabase.from('items').select('id').eq('category', 'car')
  if (e1) console.error('Error cars:', e1)
  
  console.log('Querying bikes...')
  const { data: bikes, error: e2 } = await supabase.from('items').select('id').eq('category', 'bike')
  if (e2) console.error('Error bikes:', e2)

  console.log('Querying rooms...')
  const { data: rooms, error: e3 } = await supabase.from('items').select('id').eq('category', 'room')
  if (e3) console.error('Error rooms:', e3)

  console.log('Cars:', cars?.length)
  console.log('Bikes:', bikes?.length)
  console.log('Rooms:', rooms?.length)
}

check().catch(err => console.error('Fatal:', err))
