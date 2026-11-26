import { Component, OnInit, signal } from '@angular/core';
import { GiftService } from '../../services/gift';
import { Gift } from '../../models/gift';

@Component({
  selector: 'app-gifts',
  imports: [],
  templateUrl: './gifts.html',
  styleUrl: './gifts.css'
})
export class Gifts implements OnInit {
  gifts = signal<Gift[]>([]);
  errorMessage = signal('');

  constructor(private giftService: GiftService) {}

  ngOnInit() {
    this.giftService.getGifts().subscribe({
      next: (data) => {
        this.gifts.set(data.slice(0, 4));
      },
      error: () => {
        this.errorMessage.set("Impossible de charger les cadeaux. L'API est-elle lancée ?");
      }
    });
  }
}