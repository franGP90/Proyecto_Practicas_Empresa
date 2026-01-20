import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({ providedIn: 'root' })
export class PaymentService {

  stripe: Stripe | null = null;

  async initStripe() {
    if (!this.stripe) {
      this.stripe = await loadStripe('pk_test_XXXXXXXXXXXXXXXX');
    }
    return this.stripe;
  }
}
