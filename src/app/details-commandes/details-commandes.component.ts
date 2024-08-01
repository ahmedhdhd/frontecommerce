import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../commandes/orders.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-commandes',
  templateUrl: './details-commandes.component.html',
  styleUrls: ['./details-commandes.component.scss']
})
export class DetailsCommandesComponent implements OnInit {

  order?: any;
  ide: any;
  addItemForm: FormGroup;
  updateItemForm: FormGroup;
  currentItemToUpdate: any;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private bcService: BreadcrumbService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.bcService.set('@OrderDetailed', ' ');

    this.addItemForm = this.fb.group({
      idProduit: ['', Validators.required],
      Qte: ['', Validators.required],
      PrixUnitaire: ['', Validators.required],
      PrixTotal: ['', Validators.required],
    });

    this.updateItemForm = this.fb.group({
      idProduit: ['', Validators.required],
      Qte: ['', Validators.required],
      PrixUnitaire: ['', Validators.required],
      PrixTotal: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ide = parseInt(id, 10);
      this.getOrderDetails(this.ide);
    }
  }

  getOrderDetails(id: number) {
    this.orderService.getCommandeDetailed(id.toString()).subscribe({
      next: order => {
        console.log(order);
        this.order = order;
        //this.bcService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
      },
      error: err => console.error(err)
    });
  }

  deleteitems(commandid: number, itemid: number) {
    this.orderService.deleteitems(commandid, itemid).subscribe({
      next: () => {
        console.log(`Item ${itemid} from command ${commandid} deleted successfully.`);
        // Optionally refresh the order details after deletion
        this.getOrderDetails(this.ide);
      },
      error: err => console.error(err)
    });
  }

  setUpdateItem(commandid: number, itemid: number) {
    const item = this.order.items.find((i: any) => i.id === itemid);
    this.currentItemToUpdate = item;
    this.updateItemForm.patchValue(item);
  }

  onAddItem() {
    if (this.addItemForm.valid) {
      const newItem = this.addItemForm.value;
      this.orderService.addItemToCommande(this.ide, newItem).subscribe({
        next: () => {
          console.log(`Item added successfully.`);
          this.getOrderDetails(this.ide);
          this.modalService.dismissAll();
        },
        error: err => console.error(err)
      });
    }
  }

  onUpdateItem() {
    if (this.updateItemForm.valid) {
      const updatedItem = this.updateItemForm.value;
      this.orderService.updateItem(this.ide, this.currentItemToUpdate.id, updatedItem).subscribe({
        next: () => {
          console.log(`Item updated successfully.`);
          this.getOrderDetails(this.ide);
          this.modalService.dismissAll();
        },
        error: err => console.error(err)
      });
    }
  }
}
