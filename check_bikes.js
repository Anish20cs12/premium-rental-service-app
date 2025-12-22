import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Load env vars manually
const envPath = path.resolve(process.cwd(), '.env')
let url = process.env.VITE_SUPABASE_URL
let key = process.env.VITE_SUPABASE_ANON_KEY

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

const supabase = createClient(url, key)

async function checkBikes() {
  console.log('Checking bikes in DB...')
  const { data, error } = await supabase
    .from('items')
    .select('id, title, location')
    .eq('category', 'bike')
  
  if (error) {
    console.error('Error:', error)
  } else {
    console.log(`Found ${data.length} bikes:`)
    data.forEach(b => console.log(`- ${b.id}: ${b.title} (${b.location})`))
  }
}

checkBikes().catch(console.error)
