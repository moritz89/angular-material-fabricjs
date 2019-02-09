import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fabric} from 'fabric';
import {fromEvent, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-floor-planner',
  templateUrl: './floor-planner.component.html',
  styleUrls: ['./floor-planner.component.css']
})
export class FloorPlannerComponent implements OnInit, AfterViewInit {
  canvas: any;

  // The div containing the component to find out how large the canvas should be
  @ViewChild('mainContainer') mainContainer: ElementRef;

  // Used to resize the canvas object
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor() {}

  ngOnInit() {
    // Updates the canvas size each time the window is resized
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.canvas.setDimensions(
          {width: this.mainContainer.nativeElement.offsetWidth});
    });

    // Performs the canvas setup by adding a background and interactive element
    this.canvas = new fabric.Canvas('floor-plan-canvas');
    this.canvas.backgroundColor = 'green';
    this.canvas.add(new fabric.IText(
        'You can edit and move me!', {left: 300, top: 100, angle: 30}));
  }

  // Sets the canvas dimensions during the initial render
  ngAfterViewInit() {
    this.canvas.setDimensions(
        {width: this.mainContainer.nativeElement.offsetWidth});
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }
}
