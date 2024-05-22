import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';
import { CdkScrollable } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import 'zone.js';
import { FilterPipe } from './filter.pipe';
import { PlayerComponent } from './player/player.component';
import { players } from './players';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PlayerComponent, FilterPipe, FormsModule, CdkScrollable],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [NO_ERRORS_SCHEMA],
  animations: [
    trigger('animation', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({opacity: 0, transform: 'scale(0.7)'}),
            stagger(100, [
              animate('500ms ease-in', style({opacity: 1, transform: 'scale(1)'}))
            ])
          ], { optional: true }),
          query(':enter', [
            style({backgroundColor: 'rgba(0 ,255, 0, 0.2)'}),
            animate('3s ease-in', style({backgroundColor: 'rgba(0, 0, 0, 0.1)'}))
          ], { optional: true }),
          query(':enter h2, :enter dl', [
            style({color: 'green'}),
            animate('3s ease-in', style({color: 'inherit'}))
          ], { optional: true }),
        ]),
        group([
          query(':leave', [
            style({opacity: 1, transform: 'scale(1)'}),
            stagger(-100, [
              animate('1s ease-in', style({opacity: 0, transform: 'scale(0.7)'}))
            ])
          ], { optional: true }),
          query(':leave', [
            animate('250ms ease-in', style({backgroundColor: 'rgba(255, 0, 0, 0.2)'}))
          ], { optional: true }),
          query(':leave h2, :leave dl', [
            animate('250ms ease-in', style({color: 'red'}))
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class App {
  protected players = [players[0]];
  protected totalCount = players.length;

  protected addPlayers() {
    const allPlayers = players.slice(1);
    this.players = [...this.players, ...allPlayers];
  }

  protected removePlayers() {
    this.players = [this.players[0]];
  }
}

bootstrapApplication(App,{
  providers: [
    provideAnimations()
  ]
});
