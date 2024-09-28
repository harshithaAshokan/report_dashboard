export type storeDataProps = {
    auth:authReducerProps
  }
  
  export type authReducerProps = {
      start_date : string | string[];
      end_date : string | string[];
  }