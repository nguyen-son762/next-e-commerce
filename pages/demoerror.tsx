import { GetServerSideProps } from 'next'
import Error from 'next/error'
function demoerror() {
  return (
    <Error statusCode={401}></Error>
  )
}

export default demoerror

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      name: '12313',
    },
  }
}
