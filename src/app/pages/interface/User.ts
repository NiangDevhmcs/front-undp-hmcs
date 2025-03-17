import { Role } from "./Role";

export interface User{
    id:number;
    first_name:string;
    last_name:string;
    email:string;
    matricule:string;
    image:string;
    phone_number_one:string;
    phone_number_two:string;
    status:boolean;
    address:string;
    gender:string;
    date_of_birth:string;
    role_id:number;
    tenant_id:string;
    campus_id:string;
    // password:string;
    // password_confirmation:string;
    role:Role
    profile_photo_path:string,
    profile_photo_url:string,
    requires_otp:boolean;
  }

