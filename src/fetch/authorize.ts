import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { type AuthorizationInputsType, SERVER_URL } from "../consts";
import { useNavigate } from "react-router";

export function useAuthorizationMutation(
  setIsFailed: React.Dispatch<React.SetStateAction<boolean>>
) {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["authorization"],
    mutationFn: async (payload: AuthorizationInputsType) => {
      const res = await axios.post(`${SERVER_URL}/api/v1/auth/login`, payload);
      return res.data;
    },
    onSuccess: (response) => {
      sessionStorage.setItem("token", response.access);
      navigate("/my-saved-calculations");
    },
    onError() {
      setIsFailed(true);
    },
  });
}
