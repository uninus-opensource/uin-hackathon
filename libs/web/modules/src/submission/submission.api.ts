import { TActivityRequest, TActivityResponse, TPaginationRequest } from "@psu/entities"
import { api } from "@psu/web-services"

export const GetSubmissionData = async(payload:TPaginationRequest):Promise<TActivityResponse>=>{
    const {data} = await api({
        method: 'GET',
        url: '/activity/submission',
        params: payload
    })
    return data
}


export const CreateActivity = async(payload:TActivityRequest):Promise<TActivityResponse>=>{
    const {data} = await api({
        method: 'POST',
        url: '/activity',
        data: payload
    })
    return data
}