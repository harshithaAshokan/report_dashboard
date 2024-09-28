import instance from "./axios";

  
export const loginServices = (data:FormData) => {
    return instance.post("/mpd_api/login", data);
};

export const failureAnalysisReport  = (page:number,size:number,data:FormData) => {
    return instance.post(`/mpd_api/report/failureAnalysisReport?page=${page}&size=${size}`,data)
}


export const NotificationHistoryReport  = (page:number,size:number,data:FormData) => {
    return instance.post(`/mpd_api/report/NotificationHistoryReport?page=${page}&size=${size}`,data)
}
