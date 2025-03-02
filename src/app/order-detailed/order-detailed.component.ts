import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../commandes/orders.service';
import { Commande } from '../shared/models/user';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {

  order?: any;

  constructor(private orderService: OrdersService, private route: ActivatedRoute, private bcService: BreadcrumbService) {
      this.bcService.set('@OrderDetailed', ' ');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.orderService.getCommandeDetailed(id).subscribe({
      next: order => {
        console.log(order)
        this.order = order;
        //this.bcService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
      }
    })
  }

}
