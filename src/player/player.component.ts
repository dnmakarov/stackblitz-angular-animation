import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, HostBinding, ViewChild } from '@angular/core';
import { Player } from '../players';
import { PlayerDetailsComponent } from './player-details/player-details.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  imports: [NgOptimizedImage, CommonModule, OverlayModule, PlayerDetailsComponent],
  standalone: true
})
export class PlayerComponent {
  @Input({required: true}) player!: Player;
  @ViewChild(PlayerDetailsComponent) detailsComponent!: PlayerDetailsComponent;
  protected detailsOpen = false;
  protected scrollStrategy = this.overlay.scrollStrategies.reposition();

  constructor(private overlay: Overlay) {}
}
