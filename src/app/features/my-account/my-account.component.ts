import { Component, signal } from '@angular/core';
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { OrderHistoryComponent } from "./order-history/order-history.component";
import { PreferencesComponent } from "./preferences/preferences.component";

@Component({
  selector: 'app-my-account',
  imports: [AccountSettingsComponent, OrderHistoryComponent, PreferencesComponent],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {
  protected activeTab = signal<'settings' | 'orders' | 'preferences'>('settings');
}

