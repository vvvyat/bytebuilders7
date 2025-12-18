import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { type RegistrationInputsType, SERVER_URL } from "../consts"

export function useRegistrationMutation(setIsFailed: React.Dispatch<React.SetStateAction<boolean>>, setIsSucceeded: React.Dispatch<React.SetStateAction<boolean>>) {
    return useMutation({
        mutationKey: ['registration'],
        mutationFn: async (payload: RegistrationInputsType) => {
            const res = await axios.post(`${SERVER_URL}/api/v1/auth/register`, payload)
            return res.data
        },
        onSuccess () {
            setIsSucceeded(true)
        },
        onError () {
            setIsFailed(true)
        }
    })
}