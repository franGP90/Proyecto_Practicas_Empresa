import { Component } from '@angular/core';
import { PaymentService } from '../../../services/stripePayment.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BookService } from '../../../services/book.service';
import { Book, Format } from '../../../models/book.model';
import { User } from '../../../models/user.model';
import { StripeElements } from '@stripe/stripe-js';
@Component({
  selector: 'app-purchase-steps',
  imports: [NgFor, NgIf],
  templateUrl: './purchase-steps.component.html',
  styleUrl: './purchase-steps.component.scss'
})
export class PurchaseStepsComponent {
user: User | null = null;
book: Book | null = null;
selectedFormat:Format | null = null;
elements!: StripeElements;
closePurchaseDataModal() {
this.router.navigate(['/home-page']);
}
async confirmPurchaseData() {
  const stripe = this.paymentService.stripe;
  if (!stripe || !this.elements) return;

  const { error } = await stripe.confirmPayment({
    elements: this.elements,
    confirmParams: {
      return_url: window.location.origin + '/success'
    }
  });

  if (error) {
    console.log(error.message);
  }
}
selectedDireccion: any;
  constructor(private paymentService: PaymentService, private bookService: BookService, private auth: AuthService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.user = this.auth.currentUser || null;
    this.route.params.subscribe(params => {
      this.bookService.getBook(params['id']).subscribe( data => {
        this.book = data;
      });
    });
    console.log(this.user);
  }
  async ngAfterViewInit() { 
    const stripe = await this.paymentService.initStripe();
    if (!stripe){ 
      return;
    }
    const clientSecret = 'pi_test_secret_fake';

    this.elements = stripe.elements({ clientSecret });

    const paymentElement = this.elements.create('payment');

    paymentElement.mount('#payment-element');

  }
}
