import { ThemeType } from 'grommet'

const theme:ThemeType = {
  global: {
    colors: {
      black: '#000000',
      blackFont: '#343633',
      brightPink: '#EA00B0',
      gradientTurqoiseBlue:
        'linear-gradient(180deg, #2D3FAD 0%, #00B3AE 77.97%);',
      lightBlueGrey: '#E4EFF8',
      lightTan: '#FFEFA5',
      lightGrey: '#F6F6F6',
      darkBlueGrey: '#7C92A2',
      greyBacking: '#FCFCFC',
      orangeYellow: '#FFAA00',
      turqoise: '#00B3AE',
      sapphire: '#2d3fad',
      white: '#ffffff',
      brand: '#1A1C1F',
      background: {
        dark: '#111111',
        light: '#FCFCFC',
      },
      'background-back': {
        dark: '#111111',
        light: '#FCFCFC',
      },
      'background-front': {
        dark: '#222222',
        light: '#FCFCFC',
      },
      'background-contrast': {
        dark: '#FFFFFF11',
        light: '#FCFCFC',
      },
      text: {
        dark: '#EEEEEE',
        light: '#000000',
      },
      'text-strong': {
        dark: '#FFFFFF',
        light: '#000000',
      },
      'text-weak': {
        dark: '#7C92A2',
        light: '#7C92A2',
      },
      'text-xweak': {
        dark: '#7C92A2',
        light: '#7C92A2',
      },
      border: {
        dark: '#444444',
        light: '#F6F6F6',
      },
      control: 'brand',
      'active-background': 'brand',
      'active-text': 'text-strong',
      'selected-background': 'brand',
      'selected-text': 'text-strong',
      'status-critical': '#FF4040',
      'status-warning': '#FFAA15',
      'status-ok': '#00C781',
      'status-unknown': '#CCCCCC',
      'status-disabled': '#CCCCCC',
      'graph-0': 'brand',
      'graph-1': 'status-warning',
      focus: 'brand',
      'overlay-background': 'rgba(9, 15, 51, 0.7)',
    },
    font: {
      family: 'Montserrat',
      height: '28px'
    },
    active: {
      background: 'active-background',
      color: 'active-text',
    },
    hover: {
      background: 'active-background',
      color: 'active-text',
    },
    selected: {
      background: 'selected-background',
      color: 'selected-text',
    },
    control: {
      border: {
        radius: '4px',
      },
    },
    drop: {
      border: {
        radius: '4px',
      },
    },
    borderSize: {
      xsmall: '1px',
      small: '2px',
      medium: '5px',
      large: '14px',
      xlarge: '28px',
    },
    breakpoints: {
      small: {
        value: 500,
        borderSize: {
          xsmall: '1px',
          small: '2px',
          medium: '5px',
          large: '7px',
          xlarge: '14px',
        },
        edgeSize: {
          none: '0px',
          hair: '1px',
          xxsmall: '2px',
          xsmall: '4px',
          small: '7px',
          medium: '14px',
          large: '28px',
          xlarge: '56px',
        },
        size: {
          xxsmall: '28px',
          xsmall: '56px',
          small: '112px',
          medium: '224px',
          large: '448px',
          xlarge: '896px',
          full: '100%',
        },
      },
      medium: {
        value: 768,
      },
      large: {
        value: 1280,
      },
    },
    edgeSize: {
      none: '0px',
      hair: '1px',
      xxsmall: '4px',
      xsmall: '7px',
      small: '14px',
      medium: '28px',
      large: '56px',
      xlarge: '112px',
      responsiveBreakpoint: 'small',
    },
    input: {
      padding: '14px',
      weight: 600,
    },
    spacing: '28px',
    size: {
      xxsmall: '56px',
      xsmall: '112px',
      small: '224px',
      medium: '448px',
      large: '896px',
      xlarge: '1344px',
      xxlarge: '1792px',
      full: '100%',
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  button: {
    border: {
      width: '2px',
      radius: '4px',
    },
    padding: {
      vertical: '5px',
      horizontal: '26px',
    },
  },
  checkBox: {
    check: {
      radius: '4px',
    },
    toggle: {
      radius: '4px',
      size: '56px',
    },
    size: '28px',
  },
  radioButton: {
    size: '28px',
    check: {
      radius: '4px',
    },
  },
  formField: {
    border: {
      color: 'border',
      error: {
        color: {
          dark: 'white',
          light: 'status-critical',
        },
      },
      position: 'inner',
    },
    content: {
      pad: 'small',
    },
    disabled: {
      background: {
        color: 'status-disabled',
        opacity: 'medium',
      },
    },
    error: {
      color: 'status-critical',
      margin: {
        vertical: 'xsmall',
        horizontal: 'small',
      },
    },
    help: {
      color: 'dark-3',
      margin: {
        start: 'small',
      },
    },
    info: {
      color: 'text-xweak',
      margin: {
        vertical: 'xsmall',
        horizontal: 'small',
      },
    },
    label: {
      margin: {
        vertical: 'xsmall',
        horizontal: 'small',
      },
    },
    margin: {
      bottom: 'small',
    },
    round: '4px',
  },
  calendar: {
    small: {
      fontSize: '12.6px',
      lineHeight: 1.375,
      daySize: '32.00px',
    },
    medium: {
      fontSize: '21px',
      lineHeight: 1.45,
      daySize: '64.00px',
    },
    large: {
      fontSize: '46.2px',
      lineHeight: 1.11,
      daySize: '128.00px',
    },
  },
  clock: {
    analog: {
      hour: {
        width: '9px',
        size: '28px',
      },
      minute: {
        width: '5px',
        size: '14px',
      },
      second: {
        width: '4px',
        size: '11px',
      },
      size: {
        small: '84px',
        medium: '112px',
        large: '168px',
        xlarge: '252px',
        huge: '336px',
      },
    },
    digital: {
      text: {
        xsmall: {
          size: '4.199999999999999px',
          height: 1.5,
        },
        small: {
          size: '12.6px',
          height: 1.43,
        },
        medium: {
          size: '21px',
          height: 1.375,
        },
        large: {
          size: '29.4px',
          height: 1.167,
        },
        xlarge: {
          size: '37.8px',
          height: 1.1875,
        },
        xxlarge: {
          size: '54.6px',
          height: 1.125,
        },
      },
    },
  },
  heading: {
    weight: 700,
    // on small screens, heading styling jumps to style
    // one level lower
    level: {
      '1': {
        // medium used by default
        // use <Heading size="small"> for custom behaviour
        medium: {
          size: '3.5rem',
          height: '3.8rem',
          maxWidth: 'unset',
        },
      },
      '2': {
        medium: {
          size: '2.5rem',
          height: '2.75rem',
          maxWidth: 'unset',
        },
      },
      '3': {
        medium: {
          size: '2rem',
          height: '2.5rem',
          maxWidth: 'unset',
        },
      },
      '4': {
        medium: {
          size: '1.5rem',
          height: '1.75rem',
          maxWidth: 'unset',
        },
      },
      '5': {
        medium: {
          size: '1.325rem',
          height: '1.75rem',
          maxWidth: 'unset',
        },
      },
      '6': {
        medium: {
          size: '1.2rem',
          height: '1.75rem',
          maxWidth: 'unset',
        },
      },
    },
  },
}

export { theme }
