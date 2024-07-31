import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order';
import { OrdersService } from './orders.service';
import { Commande } from '../shared/models/user';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  

  search=""
  commandes: any[] = [];

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getCommandes();
  }

  getCommandes() {
    this.orderService.getallcommande().subscribe({
    next: response => {
      this.commandes = response
    },
    error : error => console.log(error)
    })
  }

  // getCommandesforuser

}
