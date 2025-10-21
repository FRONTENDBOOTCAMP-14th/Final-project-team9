import { supabase } from '@/lib/supabase'

export default async function fetchFilterOptions() {
  const { data: position, error: positionError } = await supabase
    .from('positions')
    .select('name')
  const { data: field, error: fieldError } = await supabase
    .from('fields')
    .select('name')
  const { data: domain, error: domainError } = await supabase
    .from('domains')
    .select('name')

  if (positionError) throw positionError
  if (fieldError) throw fieldError
  if (domainError) throw domainError

  return { position, field, domain }
}
