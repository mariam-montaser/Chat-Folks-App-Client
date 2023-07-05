
import {map} from 'rxjs/operators';

import { PaginationResult } from "../models/pagination";
import { HttpClient, HttpParams } from '@angular/common/http';

export function getPaginatedResult<T>(url, params, http: HttpClient){
    const paginationResult: PaginationResult<T> = new PaginationResult<T>();
    return http.get<T>(url, {observe: 'response', params}).pipe(
      map(response => { 
        // console.log("http response: ======================");
        // console.log(response);
        
        paginationResult.result = response.body;
        if(response.headers.get('pagination')!== null){
          paginationResult.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return paginationResult;
      })
    )
  }

  export function getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params: HttpParams = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }