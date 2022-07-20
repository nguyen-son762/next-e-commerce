import Head from "next/head";

interface Iprops {
  statusCode: number;
}
function PageError({ statusCode }: Iprops) {
  return <p>404- Not found</p>;
}
export default PageError;
