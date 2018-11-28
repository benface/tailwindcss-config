const _ = require('lodash');
const layoutPlugin = require('tailwindcss-layout');
const gradientsPlugin = require('tailwindcss-gradients');
const typographyPlugin = require('tailwindcss-typography');
const transitionsPlugin = require('tailwindcss-transitions');
const transformsPlugin = require('tailwindcss-transforms');
const filtersPlugin = require('tailwindcss-filters');
const objectFitPlugin = require('tailwindcss-object-fit');
const objectPositionPlugin = require('tailwindcss-object-position');
const blendModePlugin = require('tailwindcss-blend-mode');
const accessibilityPlugin = require('tailwindcss-accessibility');

module.exports = ({
  rootFontSize = 16,
  gridResolution = 1,
  maxGridSizeBeforeSkipping = 400,
  gridSizeStepAfterSkipping = 5,
  maxGridSize = 1200,
  maxPxSize = 0,
  maxFixedPxSize = 0,
  maxDenominator = 12,
  maxBorderWidth = 16,
  maxZIndex = 100,
  maxIndent = 40,
  maxTransitionDuration = 2000,
  maxScale = 200,
  colors = {},
  screens = {},
  fonts = {},
  textSizes = {},
  fontWeights = {},
  leading = {},
  tracking = {},
  textColors = {},
  backgroundColors = {},
  backgroundSize = {},
  borderWidths = {},
  borderColors = {},
  borderRadius = {},
  width = {},
  height = {},
  minWidth = {},
  minHeight = {},
  maxWidth = {},
  maxHeight = {},
  padding = {},
  margin = {},
  negativeMargin = {},
  shadows = {},
  zIndex = {},
  opacity = {},
  svgFill = {},
  svgStroke = {},
  modules = {},
  offset = {},
  flexGrow = {},
  flexShrink = {},
  order = {},
  aspectRatio = {},
  gradients = {},
  gradientDirections = {},
  textShadows = {},
  transitionProperties = {},
  transitionDurations = {},
  transitionTimingFunctions = {},
  transitionDelays = {},
  willChange = {},
  translate = {},
  negativeTranslate = {},
  scale = {},
  rotate = {},
  negativeRotate = {},
  skew = {},
  transformOrigins = {},
  filters = {},
  plugins = [],
  tailwindOptions = {},
} = {}) => {
  const pxToRem = valueInPx => `${valueInPx / rootFontSize}rem`;

  const range = (start, end, {
    step = 1,
    type = null,
    unit = null,
    includeUnitInKey = false,
    multiplyValueBy = 1,
    divideValueBy = 1,
  } = {}) => {
    if (unit === null) {
      unit = type;
    }
    return Object.assign(
      {},
      ..._.range(start, end + 1, step).map((n) => {
        const key = n + (unit && includeUnitInKey ? unit : '');
        let value = n * multiplyValueBy / divideValueBy;
        if (type === 'grid') {
          value *= gridResolution;
        }
        if (type === 'grid' || type === 'px') {
          value = value === 1 ? '1px' : pxToRem(value);
        } else if (type === 'fpx') {
          value = `${value}px`;
        } else {
          value += unit;
        }
        return { [key]: value };
      }),
    );
  };

  const gridRange = (start, end, options = {}) => range(start, end, {
    type: 'grid',
    ...options,
  });

  const pxRange = (start, end, options = {}) => range(start, end, {
    type: 'px',
    includeUnitInKey: true,
    ...options,
  });

  const fixedPxRange = (start, end, options = {}) => range(start, end, {
    type: 'fpx',
    includeUnitInKey: true,
    ...options,
  });

  const sizes = {
    0: '0',
    ...gridRange(1, Math.min(maxGridSizeBeforeSkipping, maxGridSize)),
    ...gridRange(maxGridSizeBeforeSkipping, maxGridSize, { step: gridSizeStepAfterSkipping }),
    ...pxRange(1, maxPxSize),
    ...fixedPxRange(1, maxFixedPxSize),
  };

  const percentages = (() => {
    const returnedPercentages = {};
    for (let denominator = 1; denominator <= maxDenominator; denominator += 1) {
      for (let numerator = 1; numerator <= denominator; numerator += 1) {
        const key = numerator / denominator === 1 ? 'full' : `${numerator}/${denominator}`;
        const value = `${numerator / denominator * 100}%`;
        if (Object.values(returnedPercentages).includes(value)) {
          continue;
        }
        returnedPercentages[key] = value;
      }
    }
    return returnedPercentages;
  })();

  colors = {
    'current-color': 'currentColor',
    'transparent': 'transparent',
    'white': 'white',
    'black': 'black',
    ...colors,
  };

  screens = {
    'xs': '400px',
    'sm': '600px',
    'md': '800px',
    'lg': '1000px',
    'xl': '1200px',
    ...screens,
  };

  fonts = {
    'default': [
      'system-ui',
      'BlinkMacSystemFont',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
    ...fonts,
  };

  textSizes = {
    'default': pxToRem(rootFontSize),
    ...textSizes,
  };

  fontWeights = {
    // 'hairline': 100,
    // 'thin': 200,
    // 'light': 300,
    'regular': 400,
    // 'medium': 500,
    // 'semibold': 600,
    // 'bold': 700,
    // 'extrabold': 800,
    // 'black': 900,
    ...fontWeights,
  };

  leading = {
    'none': 1,
    // 'tight': 1.2,
    'default': 1.4,
    // 'loose': 1.8,
    ...leading,
  };

  tracking = {
    // 'tight': '-0.05em',
    'default': '0',
    // 'wide': '0.1em',
    ...tracking,
  };

  textColors = {
    ...colors,
    ...textColors,
  };

  backgroundColors = {
    ...colors,
    ...backgroundColors,
  };

  backgroundSize = {
    'auto': 'auto',
    'cover': 'cover',
    'contain': 'contain',
    ...backgroundSize,
  };

  borderWidths = {
    '0': '0',
    'default': '1px',
    ...pxRange(2, maxBorderWidth, { includeUnitInKey: false }),
    ...borderWidths,
  };

  borderColors = {
    'default': 'black',
    ...colors,
    ...borderColors,
  };

  borderRadius = {
    'none': '0',
    'default': pxToRem(4),
    'full': '99999px',
    ...borderRadius,
  };

  width = {
    'auto': 'auto',
    'screen': '100vw',
    'screen-1/2': '50vw',
    ...sizes,
    ...percentages,
    ...width,
  };

  height = {
    'auto': 'auto',
    'screen': '100vh',
    'screen-1/2': '50vh',
    ...sizes,
    ...percentages,
    ...height,
  };

  minWidth = {
    ...sizes,
    ...percentages,
    ...minWidth,
  };

  minHeight = {
    'screen': '100vh',
    ...sizes,
    ...percentages,
    ...minHeight,
  };

  maxWidth = {
    'none': 'none',
    'screen': '100vw',
    ...screens,
    ...sizes,
    ...percentages,
    ...maxWidth,
  };

  maxHeight = {
    'screen': '100vh',
    ...sizes,
    ...percentages,
    ...maxHeight,
  };

  padding = {
    ...sizes,
    ...padding,
  };

  margin = {
    'auto': 'auto',
    ...sizes,
    ...percentages,
    ...margin,
  };

  negativeMargin = {
    ...sizes,
    ...negativeMargin,
  };

  shadows = {
    'none': 'none',
    'default': `0 ${pxToRem(2)} ${pxToRem(6)} 0 rgba(0, 0, 0, 0.25)`,
    ...shadows,
  };

  zIndex = {
    'auto': 'auto',
    ...range(0, maxZIndex, { step: 10 }),
    ...zIndex,
  };

  opacity = {
    ...range(0, 100, { step: 5, divideValueBy: 100 }),
    ...opacity,
  };

  svgFill = {
    'current': 'currentColor',
    ...svgFill,
  };

  svgStroke = {
    'current': 'currentColor',
    ...svgStroke,
  };

  modules = {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColors: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: ['responsive'],
    borderColors: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidths: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: ['responsive'],
    fonts: ['responsive'],
    fontWeights: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
    height: ['responsive'],
    leading: ['responsive'],
    lists: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    opacity: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
    outline: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    shadows: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
    svgFill: ['responsive'],
    svgStroke: ['responsive'],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColors: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
    textSizes: ['responsive'],
    textStyle: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
    tracking: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
    ...modules,
  };

  plugins = [
    layoutPlugin({
      variants: ['responsive'],
      offset: {
        'full': '100%',
        ...offset,
      },
      flexGrow: {
        '2': '2',
        '3': '3',
        ...flexGrow,
      },
      flexShrink: {
        '2': '2',
        '3': '3',
        ...flexShrink,
      },
      order: {
        '0': '0',
        '1': '1',
        '2': '2',
        ...order,
      },
      aspectRatio: {
        '1/1': 1,
        '16/9': 16 / 9,
        ...aspectRatio,
      },
    }),
    gradientsPlugin({
      variants: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
      directions: {
        't': 'to top',
        'r': 'to right',
        'b': 'to bottom',
        'l': 'to left',
        ...gradientDirections,
      },
      gradients: {
        'white': 'white',
        'black': 'black',
        ...gradients,
      },
    }),
    typographyPlugin({
      variants: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
      indents: gridRange(0, maxIndent),
      textShadows: {
        'default': `0 ${pxToRem(2)} ${pxToRem(6)} rgba(0, 0, 0, 0.25)`,
        ...textShadows,
      },
    }),
    transitionsPlugin({
      variants: ['responsive'],
      properties: {
        'border': 'border-color',
        'bg': 'background-color',
        'shadow': 'box-shadow',
        'color': 'color',
        'opacity': 'opacity',
        'transform': 'transform',
        'border-and-bg': ['border-color', 'background-color'],
        'border-and-shadow': ['border-color', 'box-shadow'],
        'border-and-color': ['border-color', 'color'],
        'border-and-opacity': ['border-color', 'opacity'],
        'border-and-transform': ['border-color', 'transform'],
        'bg-and-shadow': ['background-color', 'box-shadow'],
        'bg-and-color': ['background-color', 'color'],
        'bg-and-opacity': ['background-color', 'opacity'],
        'bg-and-transform': ['background-color', 'transform'],
        'shadow-and-color': ['box-shadow', 'color'],
        'shadow-and-opacity': ['box-shadow', 'opacity'],
        'shadow-and-transform': ['box-shadow', 'transform'],
        'color-and-opacity': ['color', 'opacity'],
        'color-and-transform': ['color', 'transform'],
        'opacity-and-transform': ['opacity', 'transform'],
        'border-bg-and-shadow': ['border-color', 'background-color', 'box-shadow'],
        'border-bg-and-color': ['border-color', 'background-color', 'color'],
        'border-bg-shadow-and-color': [
          'border-color',
          'background-color',
          'box-shadow',
          'color',
        ],
        ...transitionProperties,
      },
      durations: {
        'default': '250ms',
        ...range(500, maxTransitionDuration, { step: 250, unit: 'ms' }),
        ...transitionDurations,
      },
      timingFunctions: {
        'ease': 'ease',
        'ease-in': 'easein',
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out',
        'linear': 'linear',
        'step-start': 'step-start',
        'step-end': 'step-end',
        ...transitionTimingFunctions,
      },
      delays: {
        'none': '0s',
        ...transitionDelays,
      },
      willChange: {
        'opacity': 'opacity',
        'transform': 'transform',
        ...willChange,
      },
    }),
    transformsPlugin({
      variants: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
      translate: {
        ...percentages,
        ...translate,
      },
      negativeTranslate: {
        ...percentages,
        ...negativeTranslate,
      },
      scale: {
        ...range(5, maxScale, { step: 5, divideValueBy: 100 }),
        ...scale,
      },
      rotate: {
        '0': '0deg',
        '90': '90deg',
        '180': '180deg',
        '270': '270deg',
        ...rotate,
      },
      negativeRotate: {
        '0': '0deg',
        '90': '90deg',
        '180': '180deg',
        '270': '270deg',
        ...negativeRotate,
      },
      skew: {
        ...skew,
      },
      origins: {
        't': '50% 0%',
        'r': '100% 50%',
        'b': '50% 100%',
        'l': '0% 50%',
        ...transformOrigins,
      },
    }),
    filtersPlugin({
      variants: ['responsive', 'hover', 'group-hover', 'active', 'focus'],
      filters: {
        ...filters,
      },
    }),
    objectFitPlugin(['responsive']),
    objectPositionPlugin(['responsive']),
    blendModePlugin(['responsive', 'hover', 'group-hover', 'active', 'focus']),
    accessibilityPlugin,
    ...plugins,
  ];

  const options = {
    prefix: '',
    important: false,
    separator: ':',
    ...tailwindOptions,
  };

  return {
    colors,
    screens,
    fonts,
    textSizes,
    fontWeights,
    leading,
    tracking,
    textColors,
    backgroundColors,
    backgroundSize,
    borderWidths,
    borderColors,
    borderRadius,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    padding,
    margin,
    negativeMargin,
    shadows,
    zIndex,
    opacity,
    svgFill,
    svgStroke,
    modules,
    plugins,
    options,
  };
};
