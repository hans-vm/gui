// Contextual Calendar Display
// ===========================
// A contextual popout for use with the ContextBar component. Displays a palette
// of available tasks and other calendar content.

"use strict";

import React from "react";
import _ from "lodash";
import TWBS from "react-bootstrap";

import EventBus from "../../../utility/EventBus";

function formatDraggable ( content ) {
  return (
    { type     : "calendarItem"
    , callback : null
    , content  : content
    }
  );
}
const ContextCalendar = React.createClass(

  { displayName: "Contextual Calendar Drawer"

  , render () {
      return (
        <TWBS.Grid>
          <h2>Calendar</h2>
          <div onMouseDown = { EventBus.startDrag.bind( EventBus, formatDraggable( "scrub" ) ) }> START </div>
        </TWBS.Grid>
      );
    }

  }
);

export default ContextCalendar;
