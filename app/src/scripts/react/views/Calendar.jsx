// CALENDAR
// ========
// View containing information about all scheduled tasks, cronjobs, scrubs, etc

"use strict";

import React from "react";
import _ from "lodash";
import TWBS from "react-bootstrap";
import moment from "moment";

import EventBus from "../components/EventBus";
import Icon from "../components/Icon";

import ContextCalendar from "../context/ContextCalendar";

function createMonth ( time = moment() ) {
  let today = moment();
  let date = new Date( time.year(), time.month(), 1 );
  let result = [];

  while ( date.getMonth() === time.month() ) {
    if ( today.isSame( date, "day" ) ) {
      result.push({ today: true });
    } else {
      result.push( null );
    }
    date.setDate( date.getDate() + 1 );
  }

  return result;
}

const Calendar = React.createClass(
  { displayName: "Calendar"

  , getInitialState: function () {
      let now = moment();

      return (
        { activeMonth  : now.month()
        , selectedDay  : now.date()
        , monthContent : createMonth( now )
        , mode         : "month"
        , dropZones    : false
        }
      );
    }

  , componentDidMount () {
      EventBus.addListener( "dragStart", this.showDropZones );
      EventBus.addListener( "dragStop", this.hideDropZones );
      EventBus.emit( "showContextPanel", ContextCalendar );
    }

  , componentWillUnmount () {
      EventBus.removeListener( "dragStart", this.showDropZones );
      EventBus.removeListener( "dragStop", this.hideDropZones );
      EventBus.emit( "hideContextPanel", ContextCalendar );
    }

  , showDropZones: function ( type ) {
      if ( type === "calendarItem" ) {
        this.setState({ dropZones: true });
      }
    }

  , hideDropZones: function () {
      this.setState({ dropZones: false });
    }

  , handleDrop: function ( event ) {
      console.log( event );
      console.log( event.target );
      console.log( EventBus.resolveDrag() );
    }

  , handlePage: function ( direction ) {
      let now = moment().month( this.state.activeMonth );

      if ( direction === "prev" ) {
        now.subtract( 1, "months" );
      } else if ( direction === "next" ) {
        now.add( 1, "months" );
      }

      this.setState(
        { activeMonth  : now.month()
        , selectedDay  : now.startOf( "month" ).date()
        , monthContent : createMonth( now )
        }
      );
    }

  , handleToday: function ( direction ) {
      let now = moment();

      this.setState(
        { activeMonth  : now.month()
        , selectedDay  : now.date()
        , monthContent : createMonth( now )
        }
      );
    }

  , selectDay: function ( day ) {
      this.setState({ selectedDay: day });
    }

  , createBlankDays: function ( number ) {
      let result = [];

      for ( let i = 0; i < number; i++ ) {
        result.push(
          <div
            key={ i }
            className="day"
          >
            <span className="day-content day-blank"></span>
          </div>
        );
      }

      return result;
    }

  , dayMonth: function ( contents, index ) {
      let dayClass = [ "day" ];

      if ( contents ) {
        if ( contents["today"] ) {
          dayClass.push( "today" );
        }
      }

      if ( index + 1 === this.state.selectedDay ) {
        dayClass.push( "selected" );
      }

      if ( this.state.dropZones ) {
        dayClass.push( "droppable" );
      }

      return (
        <div
          key       = { index }
          className = { dayClass.join( " " ) }
          onClick   = { this.selectDay.bind( null, index + 1 ) }
          onMouseUp = { this.state.dropZones ? this.handleDrop : null }
        >
          <span className="day-content">
            <span className="day-numeral">{ index + 1 }</span>
          </span>
        </div>
      );
    }

  , render: function () {
      let activeMoment = moment().month( this.state.activeMonth );
      let month = activeMoment.format( "MMMM" );
      let year  = activeMoment.format( "YYYY" );

      let start = activeMoment.startOf( "month" ).day();
      let end = ( 7 - ( ( start + this.state.monthContent.length ) % 7 ) );

      return (
        <main className="calendar">
          <div
            className = "clearfix"
            style     = {{ margin: "25px" }}
          >
            <h1
              className = "pull-left"
              style     = {{ margin: 0 }}
            ><b>{ month }</b> { year }</h1>

            <TWBS.ButtonGroup
              className = "pull-right"
              style     = {{ margin: 0 }}
            >
              <TWBS.Button
                onClick={ this.handlePage.bind( null, "prev" ) }
              ><Icon glyph="chevron-left" /></TWBS.Button>
              <TWBS.Button
                onClick={ this.handleToday }
              >Today</TWBS.Button>
              <TWBS.Button
                onClick={ this.handlePage.bind( null, "next" ) }
              ><Icon glyph="chevron-right" /></TWBS.Button>

            </TWBS.ButtonGroup>
          </div>

          <div className="month">
            <span className="day-label">Sunday</span>
            <span className="day-label">Monday</span>
            <span className="day-label">Tuesday</span>
            <span className="day-label">Wednesday</span>
            <span className="day-label">Thursday</span>
            <span className="day-label">Friday</span>
            <span className="day-label">Saturday</span>
            { this.createBlankDays( start ) }
            { this.state.monthContent.map( this.dayMonth ) }
            { end === 7 ? null : this.createBlankDays( end ) }
          </div>
        </main>
      );
    }

  }
);

export default Calendar;
