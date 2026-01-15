import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly newDeckUrl =
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
  private readonly drawCardsUrl =
    'https://deckofcardsapi.com/api/deck/{deck_id}/draw/?count={count}';

  private http = inject(HttpClient);
  public deckId = signal<string | null>(null);
  public pointsCounter = signal(0);
  public gameStatus = signal<'playing' | 'won' | 'lost'>('playing');
  public cardsOnHand = signal<any[]>([]);

  public async startNewGame(): Promise<void> {
    this.pointsCounter.set(0);
    this.gameStatus.set('playing');
    this.cardsOnHand.set([]);
    await this.getNewDeck();
  }

  private async getNewDeck(): Promise<any> {
    try {
      const response = await firstValueFrom( // macht aus Oberservable Promise, wartet auf response; neu für toPromise()
        this.http.get<any>(this.newDeckUrl) //Deckresponse als Typ wäre besser
      );
      this.deckId.set(response.deck_id);
      return response;
    } catch (error) {
      this.deckId.set(null);
      throw new Error('Deck konnte nicht geladen werden');
    } finally {
      console.log('neue Deck ID: ', this.deckId());
    }
  }

  public async drawCard(): Promise<any> {
    try {
      let id = this.deckId() ?? 'new';
      const response = await firstValueFrom(
        this.http.get<any>(
          this.drawCardsUrl.replace('{deck_id}', id).replace('{count}', '1')
        )
      );
      // console.log('Gezogene Karte: ', response);
      this.processCard(response.cards[0]);
      return response;
    } catch {
      throw new Error('Karten konnten nicht gezogen werden');
    }
  }

  private processCard(card: any): void {
    console.log('Gezogene Karte in processCard: ', card);
    this.cardsOnHand.update((cards) => [...cards, card]);
    const value = card.value;
    // console.log('value der gezogenen Karte: ', value, typeof value);
    const points = this.getCardPoints(value);
    // console.log('Punkte der Karte: ', points);
    this.pointsCounter.set(this.pointsCounter() + points);
    this.checkGamesStatus();
  }

  private getCardPoints(value: string): number {
    if (value === 'JACK' || value === 'QUEEN' || value === 'KING') {
      return 10;
    }
    if (value === 'ACE') {
      if (this.pointsCounter() + 11 > 21) {
        return 1;
      }
      return 11;
    }
    return parseInt(value);
  }

  private checkGamesStatus(): void {
    if (this.pointsCounter() === 21) {
      this.gameStatus.set('won');
    } else if (this.pointsCounter() > 21) {
      this.gameStatus.set('lost');
    } else {
      this.gameStatus.set('playing');
    }
  }
}
