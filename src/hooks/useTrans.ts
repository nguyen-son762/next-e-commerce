import { useRouter } from "next/router";
import lang from "~/public/lang";
type LangEnum = {
  vn: "vn";
  en: "en";
  fr: "fr";
};
const useTrans = () => {
  const { locale = "vn" } = useRouter();

  return lang[locale as keyof LangEnum];
};

export default useTrans;
