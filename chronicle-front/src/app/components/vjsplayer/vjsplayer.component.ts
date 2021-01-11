// vjs-player.component.ts
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-vjsplayer',
  template: `
    <video #target class="video-js videoPanel" controls muted playsinline preload="none"></video>
  `,
  styleUrls: [
    './vjsplayer.component.css'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target?: ElementRef;

  @Input() options?: {
      fluid: boolean,
      aspectRatio: string,
      autoplay: boolean,
      sources: {
          src: string,
          type: string,
      }[],
  };
  player?: videojs.Player;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    // instantiate Video.js
    if(this.target)
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      
    });
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}