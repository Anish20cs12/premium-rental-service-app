import { supabase } from '../lib/supabase'

export type User = {
  id: string
  name: string
  email: string
  address?: string
  phone?: string
  role: 'user' | 'admin'
}

// Helper to map Supabase user/profile to our User type
const mapUser = (u: any, profile: any): User => ({
  id: u.id,
  email: u.email || '',
  name: profile?.full_name || u.user_metadata?.full_name || 'User',
  address: profile?.address || '',
  phone: profile?.phone || '',
  role: profile?.role || 'user',
})

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) return null
  
  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()
  
  return mapUser(session.user, profile)
}

export const signup = async (name: string, email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name }, // This triggers the handle_new_user trigger
    },
  })
  if (error) throw error
  return data
}

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data.user
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const updateProfile = async (fields: Partial<Pick<User, 'name' | 'address' | 'phone'>>) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const updates: any = {}
  if (fields.name) updates.full_name = fields.name
  if (fields.address) updates.address = fields.address
  if (fields.phone) updates.phone = fields.phone
  updates.updated_at = new Date()

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single()

  if (error) throw error
  return mapUser(user, data)
}

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  void session
  if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
    window.dispatchEvent(new Event('auth-changed'))
  }
})
