# react-calendar-material

This calendar is forked from the awesome work at: ![react-calendar-material](https://github.com/icarus-sullivan/react-calendar-material)

This version includes:
- Some bugfix
- Italian language
- Specific style (Working on general and extreamly customizable details)

This component borrows heavily from the material design of google. While it is not a 1-1 look, it looks very similar to the one used in Android.

### Screenshots

_base look_

![Base look](https://github.com/icarus-sullivan/react-calendar-material/raw/master/images/base.jpg)

_selection_

![Selection](https://github.com/icarus-sullivan/react-calendar-material/raw/master/images/selection.jpg)

_no header_

![No header](https://github.com/icarus-sullivan/react-calendar-material/raw/master/images/no-header.jpg)

_horizontal_

![Horizontal](https://github.com/icarus-sullivan/react-calendar-material/raw/master/images/horizontal.jpg)


### Installation
```
npm install --save react-calendar-material
```

### Options
The current list of propTypes.

 - **_accentColor (String)_** - the theme color of the calendar
 - **_orientation_ (String)** - whether to show the calendar to the right of the header or below it
	 - **_'flex-row'_** show the calendar after the date
	 - **_'flex-col'_** show the calendar below the date
 - **_showHeader (Boolean)_** - whether to show the header for the calendar
 - **_onDatePicked (Function)_** - a callback for when a date is picked
 - **_eventsBool (Array of Boolean)_** an array of days of month to indicate events
 - **_border (Boolean)_** a boolean to enable a border (default is false)

### Usage

The following example shows the simplest case with all four props passed into our Calendar component.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar-material';

ReactDOM.render(
  <Calendar
    accentColor={'blue'}
    orientation={'flex-col'}
    showHeader={false}
    onDatePicked={(d) => {
      console.log('onDatePicked', d);
    }}/>,
  document.getElementById('root')
);

```

Please note, this is not even version 1.0.0 so if you find bugs or want to participate please log bugs to github or fork the repo.
