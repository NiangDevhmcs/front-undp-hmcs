import { User } from "../interface/User"
import { ApplicationSetting } from "../interface/ApplicationSetting";

export type MessageType = 'error-snackbar' | 'success-snackbar';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

// Créez une interface pour le mapping des libellés
export type GenderOption = {
  value: Gender;
  label: string;
}

export type AuthResponse = {
  status: boolean | 'pending_otp';
  message: string;
  requires_otp?: boolean;
  email?:string;
}

export type OtpAuthResponse = {
  status: boolean;
  requires_otp?: boolean;
  email:string;
  otp_expires_in:number;
  message:string;
}

export type CurrentUserAuth = {
  isAuthenticated:boolean;
  user:User;
  tenant_id:string;
}



export type ResponseAppSetting = {
  data:ApplicationSetting;
}

export type ResponseUser = {
  data:User[];
  meta:PaginationMeta;
}

export type ResponseMessage = {
    status:boolean;
    message:string;
}

export interface PaginationMeta {
    current_page: number  ;
    per_page: number;
    total: number;
}



export type LoginResponse = {
    message: string;
    status: number;
    session_lifetime:string;
}

  export type LogoutResponse = {
    message: string;
  }

  export interface ResponsecheckStatus{
    isAuthenticated: boolean;
    user: User;
  }




  export type ResponseSite = {
    // data:Site[];
    total:number;
  }

  export interface MailSidenavLink {
    label: string;
    route: string[];
    icon: string;
    routerLinkActiveOptions?: { exact: boolean };
  }
