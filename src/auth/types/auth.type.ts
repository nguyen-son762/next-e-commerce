export type LoginReqDef={
    email:string;
    password:string;
}

export type SignupReqDef={
    first_name:string;
    last_name:string;
    email:string;
    phonenumber:string;
    password:string;
}

export type UserInformation={
    user_id:number;
    fisrt_name:string;
    last_name:string;
    email:string;
    phonenumber:string;
    accessToken:string;
}