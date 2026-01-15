import { Component, computed, inject, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-draw-card',
  imports: [],
  templateUrl: './draw-card.component.html',
  styleUrl: './draw-card.component.scss',
})
export class DrawCardComponent implements OnInit {
  private cardsService = inject(CardsService);

  public pointsCounter = computed(() => this.cardsService.pointsCounter());
  public gameStatus = computed(() => this.cardsService.gameStatus());
  public cardsOnHand = computed(() => this.cardsService.cardsOnHand());
  public showStartNewGameButton = computed(
    () => this.gameStatus() !== 'playing'
  );

  public ngOnInit() {
    this.startNewGame();
  }

  public startNewGame(): void {
    this.cardsService.startNewGame();
  }

  public async drawCard(): Promise<void> {
    if (this.gameStatus() !== 'playing') return;
    await this.cardsService.drawCard();
  }
}
