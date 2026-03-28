import { axio2, axiosLogin } from "./axio/axios";


//////////////////////////////////Users////////////////////////////////////////////

//login
export async function accountLogin(username: any, password: any) {
  return await axiosLogin().post("/token/",
    { "username": username, "password": password },
    {}
  )
}

//create


//update


//delete














//////////////////////////////////////Residentials//////////////////////////////////////




export async function residentials(app: any) {
  return await axio2(app.user_token)
    .post("/residentials/", {}, {})

}



export async function residentialAvailability(app: any, residential: any, status: any, months: any) {
  return await axio2(app.user_token)
    .post("/check/residential/availability/", {
      "residential_id": residential,
      "availability_status_flag": status,
      "interested_user_of_residence": app.jid,
      "advance_payment_months": months
    }, {})

}