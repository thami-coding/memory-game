import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from './card/card';
import { LucideAngularModule } from 'lucide-angular';
import { CardData } from './card-data';
import { cards } from './cardData';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Card, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('quiz');
  allCards: CardData[] = [];

  flippedCards = signal<Set<string>>(new Set());
  matchedCards = signal<Set<string>>(new Set());
  private firstCard: CardData | null = null;
  private lock = false;

  onCardClick(card: CardData) {
    if (this.lock || this.flippedCards().has(card.key) || this.matchedCards().has(card.key)) {
      return;
    }

    // ✅ Flip ONLY the clicked card
    this.flippedCards.update((set) => new Set([...set, card.key]));

    // First click
    if (!this.firstCard) {
      this.firstCard = card;
      return;
    }
    
    this.lock = true;

    if (this.firstCard.pairId === card.pairId) {
      this.matchedCards.update((m) => new Set([...m, this.firstCard!.key, card.key]));
      this.resetTurn();
    } else {
      this.flippedCards.set(new Set());
      this.resetTurn();
    }
  }

  private resetTurn() {
    this.firstCard = null;
    this.lock = false;
  }

  ngOnInit(): void {
    const cardsList: CardData[] = cards.slice(0, 10);
    this.allCards = this.shuffle(cardsList);
    console.log(this.allCards);
  }

  shuffle(array: CardData[]): CardData[] {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
