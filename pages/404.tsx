interface Iprops {
  statusCode: number;
}
function PageError({ statusCode }: Iprops) {
  return <p>404- Not found {statusCode}</p>;
}
export default PageError;
