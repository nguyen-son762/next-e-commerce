import { useRouter } from 'next/router'
import React from 'react'

function Detail() {
  const router = useRouter()
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      This is blog {router.query['id']}
    </div>
  )
}

export default Detail
