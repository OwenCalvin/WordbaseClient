import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, NgZone } from '@angular/core';
import { Gesture } from 'ionic-angular/gestures/gesture';

@Directive({
  selector: '[gestures]'
})

export class GesturesDirective implements OnInit, OnDestroy {
  @Input() interval: number;

  @Output() onPressStart: EventEmitter<any> = new EventEmitter();
  @Output() onPressing: EventEmitter<any> = new EventEmitter();
  @Output() onPressEnd: EventEmitter<any> = new EventEmitter();

  el: HTMLElement;
  pressGesture: Gesture;
  int: any;

  constructor(
    public zone: NgZone,
    el: ElementRef
  ) {
    this.el = el.nativeElement;
  }

  ngOnInit() {
    this.pressGesture = new Gesture(this.el);
    this.pressGesture.listen();

    this.pressGesture.on('press', (e: any) => {
      this.zone.run(() => {
        this.int = setTimeout(() => {  
          this.onPressStart.emit(e);
        }, this.interval);
      });
    });

    this.pressGesture.on('pressup pan', (e: any) => {
      this.endPress();
    });
  }

  endPress() {
    this.zone.run(() => {
      clearInterval(this.int);
    });
    this.onPressEnd.emit();
  }

  ngOnDestroy() {
    this.zone.run(() => {
      clearInterval(this.int);
    });
    this.onPressEnd.emit();
    this.pressGesture.destroy();
  }
}