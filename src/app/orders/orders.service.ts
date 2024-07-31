import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../shared/models/order';
import { Commande } from '../shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // 3. add 2 methods in the order service to get the list of orders and a single order

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCommandesForUser() {
    return this.http.get<Commande[]>(this.baseUrl + 'Commandes');
  }
  getCommandeDetailed(id: string) {
    return this.http.get<Commande>(this.baseUrl + `Commandes/${id}` );
  }
  getallcommande(): Observable<Commande[]>{
    return this.http.get<Commande[]>(this.baseUrl+"Commandes")
  }
}
