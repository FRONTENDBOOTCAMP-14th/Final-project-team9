'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useIsOwner(projectOwnerId: string) {
  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkOwner() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setIsOwner(user.id === projectOwnerId)
      } else {
        setIsOwner(false)
      }
      setLoading(false)
    }

    checkOwner()
  }, [projectOwnerId])

  return { isOwner, loading }
}
