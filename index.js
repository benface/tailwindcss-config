const _ = require('lodash');
const layoutPlugin = require('tailwindcss-layout');
const gapPlugin = require('tailwindcss-gap');
const gradientsPlugin = require('tailwindcss-gradients');
const typographyPlugin = require('tailwindcss-typography');
const listStylePlugin = require('tailwindcss-list-style');
const multiColumnPlugin = require('tailwindcss-multi-column');
const transitionsPlugin = require('tailwindcss-transitions');
const transformsPlugin = require('tailwindcss-transforms');
const filtersPlugin = require('tailwindcss-filters');
const blendModePlugin = require('tailwindcss-blend-mode');
const accessibilityPlugin = require('tailwindcss-accessibility');
const trianglesPlugin = require('tailwindcss-triangles');
const interactionVariantsPlugin = require('tailwindcss-interaction-variants');
const fluidContainerPlugin = require('tailwindcss-fluid-container');

module.exports = ({
  rootFontSize = 16,
  gridResolution = 1,
  maxGridSizeBeforeSkipping = 400,
  gridSizeStepAfterSkipping = 5,
  maxGridSize = 1200,
  maxPxSize = 0,
  maxFixedPxSize = 0,
  maxDenominator = 12,
  maxNumerator = 6,
  maxDenominatorDifference = 1,
  extraPercentages = {},
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
  maxBorderWidth = 16,
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
  maxZIndex = 100,
  zIndex = {},
  opacity = {},
  svgFill = {},
  svgStroke = {},
  offset = {},
  flexGrow = {},
  flexShrink = {},
  order = {},
  aspectRatio = {},
  maxGap = 100,
  gradients = {},
  gradientDirections = {},
  maxIndent = 40,
  textShadows = {},
  maxColumnGap = 100,
  transitionProperties = {},
  maxTransitionDuration = 2000,
  transitionDurations = {},
  transitionTimingFunctions = {},
  transitionDelays = {},
  willChange = {},
  translate = {},
  maxScale = 200,
  scale = {},
  rotate = {},
  skew = {},
  transformOrigins = {},
  filters = {},
  container = null,
  triangles = {},
  components = {},
  utilities = {},
  utilityVariants = ['responsive'],
  plugins = [],
  modules = {},
  allVariants = ['responsive', 'hover', 'group-hover', 'active', 'focus'],
  tailwindOptions = {},
} = {}) => {
  const pxToRem = valueInPx => `${valueInPx / rootFontSize}rem`;

  const ratioToPercentage = ratio => `${ratio * 100}%`;

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
          value = pxToRem(value);
        } else if (type === 'fpx') {
          value = `${value}px`;
        } else {
          value += unit;
        }
        return { [key]: value };
      }),
    );
  };

  const rangeArray = (start, end, {
    step = 1,
  } = {}) => {
    return _.range(start, end + 1, step);
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
    '0': '0',
    ...gridRange(1, Math.min(maxGridSizeBeforeSkipping, maxGridSize)),
    ...gridRange(maxGridSizeBeforeSkipping, maxGridSize, { step: gridSizeStepAfterSkipping }),
    ...pxRange(1, maxPxSize),
    ...fixedPxRange(1, maxFixedPxSize),
  };

  const percentages = (() => {
    const percentagesBelow100 = {};
    for (let denominator = 1; denominator <= maxDenominator; denominator += 1) {
      for (let numerator = 1; numerator <= denominator; numerator += 1) {
        let key = numerator / denominator === 1 ? 'full' : `${numerator}/${denominator}`;
        let value = ratioToPercentage(numerator / denominator);
        if (Object.values(percentagesBelow100).includes(value)) {
          continue;
        }
        percentagesBelow100[key] = value;
      }
    }
    const percentagesAbove100 = {};
    for (let numerator = 2; numerator <= maxNumerator; numerator += 1) {
      for (let denominatorDifference = 1; denominatorDifference <= maxDenominatorDifference; denominatorDifference += 1) {
        let denominator = numerator - denominatorDifference;
        if (denominator <= 0) {
          continue;
        }
        let key = `${numerator}/${denominator}`;
        let value = ratioToPercentage(numerator / denominator);
        if (Object.values(percentagesAbove100).includes(value)) {
          continue;
        }
        percentagesAbove100[key] = value;
      }
    }
    return {
      ...percentagesBelow100,
      ...percentagesAbove100,
      ...extraPercentages,
    };
  })();

  colors = {
    'current-color': 'currentColor',
    'transparent': 'transparent',
    'white': 'white',
    'black': 'black',
    ...colors,
  };

  screens = {
    'xxs': '350px',
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
    'tight': 1.2,
    'default': 1.4,
    'loose': 1.8,
    ...leading,
  };

  tracking = {
    'tight': '-0.05em',
    'default': '0',
    'wide': '0.1em',
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
    'default': pxToRem(1),
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
    'current-color': 'currentColor',
    ...svgFill,
  };

  svgStroke = {
    'current-color': 'currentColor',
    ...svgStroke,
  };

  let userPlugins = plugins;

  plugins = [
    layoutPlugin({
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
      variants: ['responsive'],
    }),

    gapPlugin({
      gaps: gridRange(0, maxGap),
      variants: ['responsive'],
    }),

    gradientsPlugin({
      directions: {
        't': 'to top',
        'tr': 'to top right',
        'r': 'to right',
        'br': 'to bottom right',
        'b': 'to bottom',
        'bl': 'to bottom left',
        'l': 'to left',
        'tl': 'to top left',
        ...gradientDirections,
      },
      gradients: {
        'current-color': 'currentColor',
        'white': 'white',
        'black': 'black',
        ...gradients,
      },
      variants: allVariants,
    }),

    typographyPlugin({
      indents: gridRange(0, maxIndent),
      textShadows: {
        'default': `0 ${pxToRem(2)} ${pxToRem(6)} rgba(0, 0, 0, 0.25)`,
        ...textShadows,
      },
      variants: allVariants,
    }),

    listStylePlugin(['responsive']),

    multiColumnPlugin({
      counts: rangeArray(1, 5),
      gaps: gridRange(0, maxColumnGap),
      variants: ['responsive'],
    }),

    transitionsPlugin({
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
        '0': '0',
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
        '0': '0',
        ...transitionDelays,
      },
      willChange: {
        'opacity': 'opacity',
        'transform': 'transform',
        ...willChange,
      },
      variants: ['responsive'],
    }),

    transformsPlugin({
      translate: {
        '0': '0',
        ...percentages,
        ...translate,
      },
      negativeTranslate: {
        ...percentages,
        ...translate,
      },
      scale: {
        ...range(0, maxScale, { step: 5, divideValueBy: 100 }),
        ...scale,
      },
      rotate: {
        '0': '0',
        '45': '45deg',
        '90': '90deg',
        '135': '135deg',
        '180': '180deg',
        '225': '225deg',
        '270': '270deg',
        '315': '315deg',
        ...rotate,
      },
      negativeRotate: {
        '45': '45deg',
        '90': '90deg',
        '135': '135deg',
        '180': '180deg',
        '225': '225deg',
        '270': '270deg',
        '315': '315deg',
        ...rotate,
      },
      skew: {
        ...skew,
      },
      origins: {
        't': '50% 0%',
        'tr': '100% 0%',
        'r': '100% 50%',
        'br': '100% 100%',
        'b': '50% 100%',
        'bl': '0% 100%',
        'l': '0% 50%',
        'tl': '0% 0%',
        ...transformOrigins,
      },
      variants: allVariants,
    }),

    filtersPlugin({
      filters: {
        ...filters,
      },
      backdropFilters: {
        ...filters,
      },
      variants: allVariants,
    }),

    blendModePlugin(allVariants),

    accessibilityPlugin,

    trianglesPlugin({
      triangles: {
        'left': {
          direction: 'left',
        },
        'right': {
          direction: 'right',
        },
        'up': {
          direction: 'up',
        },
        'down': {
          direction: 'down',
        },
        ...triangles,
      },
    }),

    interactionVariantsPlugin(),
  ];

  if (container !== null) {
    plugins = [
      ...plugins,
      fluidContainerPlugin({
        ...container,
        variants: ['responsive'],
      }),
    ];
  }

  if (!_.isEmpty(components)) {
    plugins = [
      ...plugins,
      ({ addComponents }) => {
        addComponents(components);
      },
    ];
  }

  if (!_.isEmpty(utilities)) {
    plugins = [
      ...plugins,
      ({ addUtilities }) => {
        addUtilities(utilities, utilityVariants);
      },
    ];
  }

  plugins = [
    ...plugins,
    ...userPlugins,
  ];

  modules = {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColors: allVariants,
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: ['responsive'],
    borderColors: allVariants,
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidths: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: ['responsive'],
    fonts: ['responsive'],
    fontWeights: allVariants,
    height: ['responsive'],
    leading: ['responsive'],
    lists: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: allVariants,
    outline: allVariants,
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    shadows: allVariants,
    svgFill: ['responsive'],
    svgStroke: ['responsive'],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColors: allVariants,
    textSizes: ['responsive'],
    textStyle: allVariants,
    tracking: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
    ...modules,
  };

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
    plugins,
    modules,
    options,
  };
};
