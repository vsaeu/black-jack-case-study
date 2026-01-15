import { Component } from '@angular/core';
import { DrawCardComponent } from '../draw-card/draw-card.component';
import { GameNotificationComponent } from '../game-notification/game-notification.component';
import { PlayerCardsComponent } from '../player-cards/player-cards.component';

@Component({
  selector: 'app-card-board',
  imports: [DrawCardComponent, GameNotificationComponent, PlayerCardsComponent],
  templateUrl: './card-board.component.html',
  styleUrl: './card-board.component.scss',
})
export class CardBoardComponent {}
