import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, HostListener, Input, Output, AfterViewInit } from '@angular/core';
import { Player } from '../../players';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
  standalone: true,
  imports: [CommonModule, A11yModule],
  animations: [
    trigger('animation', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.8)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden <=> visible', animate('0.15s ease-in-out'))
    ])

  ]
})
export class PlayerDetailsComponent implements AfterViewInit {
  @Input({required: true}) player!: Player;
  @HostBinding('@animation') animationState = 'hidden';
  @HostListener('@animation.done', ['$event']) done(event: AnimationEvent) {
    if (event.toState === 'hidden') {
      this.closed.emit();
    }
  }
  @Output() closed = new EventEmitter<void>();

  ngAfterViewInit() {
    this.animationState = 'visible';
  }

  close() {
    this.animationState = 'hidden';
  }
}