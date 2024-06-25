import { EmbeddedAuth } from '@snowballtools/auth-embedded'
import { Snowball, SnowballChain } from '@snowballtools/js-sdk'

import { useEffect, useState } from 'react'

export const snowball = Snowball.withAuth({
  passkey: EmbeddedAuth.configure({ auth: { email: true } }),
}).create({
  apiKey: process.env.NEXT_PUBLIC_SNOWBALL_API_KEY!,
  initialChain: SnowballChain.sepolia,
})

export function useSnowball() {
  const [state, setState] = useState(100) // Value doesn't matter

  useEffect(() => {
    // Subscribe and directly return the unsubscribe function
    return snowball.subscribe(() => setState(state + 1))
  }, [state])

  return snowball
}
