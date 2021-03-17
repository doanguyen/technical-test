import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Filter, Investment, InvestmentResponse, SearchPreference} from "./models";

@Injectable({
    providedIn: "root"
})
export class InvestmentService {
    investments = new BehaviorSubject<InvestmentResponse>(null);
    preferences = new BehaviorSubject<SearchPreference>(null);

    constructor(private http: HttpClient) {
    }

    getInvestment(
        page: number = 1,
        pageSize: number = 20,
        filter: Filter = {}
    ): void {
        const params = new URLSearchParams(filter as any).toString();
        this.http
            .get<InvestmentResponse>(
                `/api/investment?page=${page}&page_size=${pageSize}&${params}`
            )
            .subscribe(response => this.investments.next(response));
    }

    getPreference(): void {
        this.http
            .get<SearchPreference>(`/api/preference`)
            .subscribe(response => this.preferences.next(response));
    }

    updateInvestment(investment: Partial<Investment>): Observable<Investment> {
        return this.http.patch(`/api/investment/${investment.id}`, investment);
    }
}
