import { GetServerSideProps } from 'next'
import { useEffect } from 'react'
function Demoerror() {
  useEffect(() => {
    throw new Error('Blocken');
  }, [])
  
  return (
    <p>Hello</p>
  )
}

export default Demoerror

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      name: '12313',
    },
  }
}
