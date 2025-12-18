import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {type SavedCalculationsListItemType, SERVER_URL } from "../consts";

export function useSavedCalculationsQuery() {
  return useQuery<SavedCalculationsListItemType[]>({
    queryKey: ["saved-calculations"],
    queryFn: async () => {
      const res = await axios.get(`${SERVER_URL}/api/v1/routes`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return res.data;
    },
  });
}
