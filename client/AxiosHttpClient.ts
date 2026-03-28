import { axiosLogin } from "./axio/axios";





export async function Login(username: any, password: any) {
  return await axiosLogin().post("/token/",
    { "username": username, "password": password },
    {}
  )
}