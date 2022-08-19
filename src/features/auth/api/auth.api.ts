import { AxiosResponse } from "axios";

import { api } from "@/apis/api";
import { LoginReqDef, SignupReqDef } from "@/features/auth/types/auth.type";
import { AuthEndpointsEnum } from "../auth";

export const loginApi = (data: LoginReqDef): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.LOGIN, data);
};

export const signUpApi = (data: SignupReqDef): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.SIGNUP, data);
};
