import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookies from "js-cookie";

import { loginApi, signUpApi } from "../api/auth.api";
import {
  LoginReqDef,
  SignupReqDef,
  UserInformation,
} from "@/features/auth/types/auth.type";
import { apiStatusCode } from "@/apis/apiStatus.constants";

interface InitialState {
  user: UserInformation | null;
  login: (user: LoginReqDef) => Promise<UserInformation | null>;
  signup: (user: SignupReqDef) => Promise<UserInformation | null>;
}

const useAuthStore = create<InitialState>()(
  devtools(
    persist(set => ({
      user: null,
      login: async data => {
        try {
          const userResponse = await loginApi(data);
          if (userResponse.status === apiStatusCode.SUCCESS) {
            set(() => {
              return {
                user: userResponse.data,
              };
            });
            Cookies.set("accessToken", userResponse.data.accessToken);
            return userResponse.data;
          }
          return null;
        } catch (err) {
          console.log("err", err);
        }
      },
      signup: async data => {
        try {
          const userResponse = await signUpApi(data);
          if (userResponse.status === apiStatusCode.SUCCESS) {
            set(() => {
              return {
                user: userResponse.data,
              };
            });
            return userResponse.data;
          }
          return null;
        } catch (err) {
          console.log("err", err);
        }
      },
    }))
  )
);

export default useAuthStore;
