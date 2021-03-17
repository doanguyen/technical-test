import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import {
  Filter,
  Investment,
  InvestmentResponse,
  SearchPreference
} from "./models";

@Injectable({
  providedIn: "root"
})
export class InvestmentService {
  /**
   * Investments store
   */
  investments = new BehaviorSubject<InvestmentResponse>(null);

  /*
   * Hold the states of (ville/etat_d_avancement) for the filter
   * */
  preferences = new BehaviorSubject<SearchPreference>(null);

  constructor(private http: HttpClient) {}

  /**
   * Get paginated investment
   * @param page (number) the page number
   * @param pageSize (pageSize) number of investments in one request
   * @param filter (Filter) by ville and/or etat_d_avancement
   */
  getInvestment(
    page: number = 1,
    pageSize: number = 50,
    filter: Filter = {}
  ): void {
    const params = new URLSearchParams(filter as any).toString();
    this.http
      .get<InvestmentResponse>(
        `/api/investment?page=${page}&page_size=${pageSize}&${params}`
      )
      .subscribe(response => this.investments.next(response));
  }

  /**
   * Get preferences (list of villes, etat_d_avancement)
   */
  getPreference(): void {
    this.http
      .get<SearchPreference>(`/api/preference`)
      .subscribe(response => this.preferences.next(response));
  }

  /**
   * Partial update the investment to the backend
   * @param investment Partial investment
   */
  updateInvestment(investment: Partial<Investment>): Observable<Investment> {
    return this.http.patch<Investment>(
      `/api/investment/${investment?.id}`,
      investment
    );
  }
}
