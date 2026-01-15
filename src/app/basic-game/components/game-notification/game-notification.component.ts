import { Component, computed, inject } from '@angular/core';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-game-notification',
  imports: [],
  templateUrl: './game-notification.component.html',
  styleUrl: './game-notification.component.scss',
})
export class GameNotificationComponent {
  private cardsService = inject(CardsService);
  public gameStatus = computed(() => this.cardsService.gameStatus());
}
