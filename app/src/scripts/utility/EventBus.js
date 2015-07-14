// GLOBAL EVENT BUS
// =====================
// Small event bus to assist with propagating events across the entire app, and
// between components which have no parent-child relationship.

"use strict";

import _ from "lodash";
import { EventEmitter } from "events";

let activeDragContent = null;

class EventBus extends EventEmitter {

  constructor () {
    super();

    this.stopHandler = this.stopDrag.bind( this );
  }

  get registeredEvents () {
    return _.keys( this._events );
  }

  startDrag ( draggable, event ) {
    window.addEventListener( "mouseup", this.stopHandler );
    activeDragContent = draggable;
    this.emit( "dragStart", draggable.type );
  }

  stopDrag ( event ) {
    window.removeEventListener( "mouseup", this.stopHandler );
    activeDragContent = null;
    this.emit( "dragStop" );
  }

  resolveDrag () {
    return draggable;
  }

}


export default new EventBus();
