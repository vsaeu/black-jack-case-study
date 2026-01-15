import { Component, computed, inject } from '@angular/core';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-player-cards',
  imports: [],
  templateUrl: './player-cards.component.html',
  styleUrl: './player-cards.component.scss',
})
export class PlayerCardsComponent {
  private cardsService = inject(CardsService);
  public pointsCounter = computed(() => this.cardsService.pointsCounter());

  public cardImages = computed(() => {
    const allCards = this.cardsService.cardsOnHand();
    return allCards.map((card) => card.image);
  });
}
