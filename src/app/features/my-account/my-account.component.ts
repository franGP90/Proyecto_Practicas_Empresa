import { Component, signal } from '@angular/core';
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { OrderHistoryComponent } from "./order-history/order-history.component";
import { PurchaseConfirmationComponent } from "../book-purchase-page/purchase-confirmation/purchase-steps.component";

@Component({
  selector: 'app-my-account',
  imports: [AccountSettingsComponent, OrderHistoryComponent],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {
  protected activeTab = signal<'settings' | 'orders'>('settings');
}

