import { Component } from '@angular/core';
import { CardBoardComponent } from "./basic-game/components/card-board/card-board.component";

@Component({
  selector: 'app-root',
  imports: [CardBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smight-black-jack';
}
