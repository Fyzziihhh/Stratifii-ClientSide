import { isAxiosError } from "axios";
import apiClient from "../config/apiClient";
import { ICompany } from "@/types/ICompany";
import { IInterviewer } from "@/types/IInterviewer";
import { IInterviewerRegistration, IInterviewerSchema } from "@/validations/InterviewerSchema";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const AuthService = {
  // Login and store tokens
  signIn: async (email: string, password: string, role: string) => {
    try {
      const response = await apiClient.post("/auth/signin", {
        email,
        password,
        role,
      });
      // setAuthTokens(response.data.accessToken, response.data.refreshToken);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("axios", error);
        return {
          success: false,
          status:error.status,
          error:
            error.response?.data?.message || "An error occurred during login",
        };
      }
      return {
        success: false,
        error: "Unexpected error occurred While SignIn",
      };
    }
  },

  companyRegister: async (company: ICompany) => {
    console.log("company : ", company);
    try {
      const response = await apiClient.post("/auth/register/company", company);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.log("axios", error);
        return {
          success: false,
          error: error.response?.data.message || "Request failed",
        };
      }
      return { success: false, error: "Unknown error" };
    }
  },

  interviewerRegister: async (interviewer: IInterviewerRegistration) => {
    try {
      const response = await apiClient.post(
        "/auth/register/interviewer",
        interviewer
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error:
            error.response?.data.message ||
            "unknow error occured while register",
        };
      }
      return { success: false, error: "Unknow Error" };
    }
  },

  verifyOtp: async (otp: string, email: string, role: string) => {
    try {
      const response = await apiClient.post("/auth/otp/verify", {
        otp,
        email,
        role,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data.message || "Request failed",
        };
      }
      return {
        success: false,
        error: "Unexpected Error Occured while verifying Otp",
      };
    }
  },

  triggerOtpResend: async (email: string) => {
    try {
      const response = await apiClient.post("/auth/otp/resend", { email });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return { success: false, error: error.response?.data.message };
      }
      return {
        success: false,
        error: "Unexpected Error Occured while Resend Otp",
      };
    }
  },

  sendForgotPasswordOtpRequest: async function (email: string, role: string) {
    try {
      const response = await apiClient.post("/auth/forgot-password", {
        email,
        role,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return { success: false, error: error.response?.data.message };
      }
      return {
        success: false,
        error: "Unexpected Error Occured while Requesting Forgot Password",
      };
    }
  },

  resetPassword: async function (
    password: string,
    confirmPassword: string,
    token: string
  ) {
    try {
      const response = await apiClient.post("/auth/reset-password", {
        password,
        confirmPassword,
        token,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return { success: false, error: error.response?.data.message };
      }
      return {
        success: false,
        error: "Unexpected Error Occured while resetting Password",
      };
    }
  },

  // Logout and remove tokens
  signOut:async () => {
    try{
      const response = await apiClient.post("/auth/signout",);
      return response.data;
    }catch(error){
      if (isAxiosError(error)) {
        return { success: false, error: error.response?.data.message };
      }
      return { success: false, error: "Unexpected Error Occured" };
    
    }
  },

  verifyUserAccount: async (email: string) => {
    try {
      const response = await apiClient.post("/auth/verify-account", { email });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return { success: false, error: error.response?.data.message };
      }
      return { success: false, error: "Unexpected Error Occured" };
    }
  },

  
  
};

export default AuthService;
