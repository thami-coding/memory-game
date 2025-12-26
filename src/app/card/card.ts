import { Component, computed, input, OnChanges, SimpleChanges } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { GameOver } from '../game-over/game-over';

@Component({
  selector: 'app-card',
  imports: [LucideAngularModule, GameOver],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  size = 50;
  readonly emoji = input<LucideIconData>();
  readonly cardKey = input.required<string>();
  readonly flippedCards = input.required<Set<string>>();
  readonly matchedCards = input.required<Set<string>>();

  readonly isFlipped = computed(
    () => this.flippedCards().has(this.cardKey()) || this.matchedCards().has(this.cardKey())
  );
}
