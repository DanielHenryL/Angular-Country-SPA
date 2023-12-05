import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, pipe } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit {

  private debouncer:Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = ''

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce:EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncer
      .pipe( debounceTime(1000) )
      .subscribe( value => {
        this.onDebounce.emit( value )
      })
  }

  emitValue( value:string ){
    this.onValue.emit( value );
  }

  onKeyPress( term:string ) {
    this.debouncer.next( term );
  }
}
