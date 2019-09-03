const _ = require('lodash');
const num2fraction = require('num2fraction');
const defaultTheme = require('tailwindcss/defaultTheme');
const resetPlugin = require('@benface/tailwindcss-reset');
const typographyPlugin = require('tailwindcss-typography');
const multiColumnPlugin = require('tailwindcss-multi-column');
const gapPlugin = require('tailwindcss-gap');
const aspectRatioPlugin = require('tailwindcss-aspect-ratio');
const gradientsPlugin = require('tailwindcss-gradients');
const transitionsPlugin = require('tailwindcss-transitions');
const transformsPlugin = require('tailwindcss-transforms');
const filtersPlugin = require('tailwindcss-filters');
const blendModePlugin = require('tailwindcss-blend-mode');
const fluidContainerPlugin = require('tailwindcss-fluid-container');
const trianglesPlugin = require('tailwindcss-triangles');
const interactionVariantsPlugin = require('tailwindcss-interaction-variants');
const childrenPlugin = require('tailwindcss-children');

module.exports = ({
  rootFontSize = 1,

  gridResolution = 1,
  maxGridSpacing = 400,
  maxPxSpacing = 0,
  pxSpacingStep = 1,
  maxEmSpacing = 2,
  emSpacingStep = 0.25,
  maxVwSpacing = 1,
  vwSpacingStep = 0.25,
  maxVhSpacing = 1,
  vhSpacingStep = 0.25,

  maxPercentageDenominator = 12,
  maxPercentageNumerator = 12,
  maxAspectRatioDenominator = 20,
  maxAspectRatioNumerator = 20,
  maxTranslateDenominator = 4,
  maxTranslateNumerator = 4,

  maxBorderWidth = 20,
  maxWidth = 1280,
  widthStep = 5,
  maxHeight = 800,
  heightStep = 5,
  maxMinWidth = 1280,
  minWidthStep = 5,
  maxMinHeight = 800,
  minHeightStep = 5,
  maxMaxWidth = 1280,
  maxWidthStep = 5,
  maxMaxHeight = 800,
  maxHeightStep = 5,
  maxPadding = null,
  paddingStep = 5,
  maxMargin = null,
  marginStep = 5,
  maxFlexGrow = 5,
  maxFlexShrink = 5,
  maxOrder = 12,
  opacityStep = 5,
  minZIndex = -10,
  maxZIndex = 100,
  zIndexStep = 10,

  maxTextIndent = 40,
  textIndentStep = 1,
  maxColumnCount = 5,
  maxColumnGap = 200,
  columnGapStep = 5,
  maxGap = null,
  gapStep = 5,
  gapLegacy = false,
  maxTransitionDuration = 2000,
  transitionDurationStep = 250,
  maxTransitionDelay = 2000,
  transitionDelayStep = 250,
  minScale = -100,
  maxScale = 200,
  scaleStep = 5,
  rotateStep = 45,
  enable3dTransforms = true,
  enableReset = true,

  defaultVariants = ['responsive', 'hover', 'group-hover', 'focus', 'group-focus', 'active', 'group-active'],
  
  prefix = '',
  important = '#a',
  separator = ':',
  theme = {},
  extendTheme = {},
  variants = {},
  corePlugins = {},
  plugins = [],
} = {}) => {
  const pxToRem = valueInPx => (valueInPx / rootFontSize) + (valueInPx !== 0 ? 'rem' : '');

  const range = (start, end, {
    step = 1,
    unit = null,
    includeUnitInKey = false,
    multiplyValueBy = 1,
    divideValueBy = 1,
  } = {}) => {
    return _.fromPairs(
      _.range(start, end + step, step).map(value => {
        let key = Math.round(value) === value ? value : num2fraction(value);
        if (unit && includeUnitInKey && value !== 0) {
          key += unit;
        }
        value *= multiplyValueBy;
        value /= divideValueBy;
        if (unit === 'grid' || unit === 'px') {
          if (unit === 'grid') {
            value *= gridResolution;
          }
          value = pxToRem(value);
        }
        else if (unit && (value !== 0 || ['s', 'ms'].includes(unit))) {
          value += unit;
        }
        return [key, value];
      })
    );
  };

  const rangeArray = (start, end, { step = 1 } = {}) => _.range(start, end + 1, step);

  const fractions = (maxDenominator, maxNumerator) => {
    const fractions = {};
    for (let denominator = 1; denominator <= Math.max(maxDenominator, maxNumerator); denominator ++) {
      for (let numerator = 1; numerator <= Math.max(maxDenominator, maxNumerator); numerator ++) {
        if (numerator === denominator || (numerator < denominator && denominator > maxDenominator) || (numerator > denominator && numerator > maxNumerator)) {
          continue;
        }
        let key = `${numerator}/${denominator}`;
        let value = numerator / denominator;
        if (Object.values(fractions).includes(value)) {
          continue;
        }
        fractions[key] = value;
      }
    }
    return fractions;
  };

  const andNegative = (negativeFunction, positiveValues) => ({
    ...positiveValues,
    ...negativeFunction(positiveValues),
  });

  const gridSpacing = range(0, maxGridSpacing, { unit: 'grid' });
  const pxSpacing = range(0, maxPxSpacing, { step: pxSpacingStep, unit: 'px', includeUnitInKey: true });
  const emSpacing = range(0, maxEmSpacing, { step: emSpacingStep, unit: 'em', includeUnitInKey: true });
  const vwSpacing = range(0, maxVwSpacing, { step: vwSpacingStep, unit: 'vw', includeUnitInKey: true });
  const vhSpacing = range(0, maxVhSpacing, { step: vhSpacingStep, unit: 'vh', includeUnitInKey: true });

  return {
    prefix,
    important,
    separator,

    theme: {
      screens: {
        'xs': '420px',
        ...defaultTheme.screens,
      },

      colors: {
        'current': 'currentColor',
        'transparent': 'transparent',
        'white': 'white',
        'black': 'black',
      },

      spacing: {
        ...gridSpacing,
        ...pxSpacing,
        ...emSpacing,
        ...vwSpacing,
        ...vhSpacing,
      },

      percentages: {
        'full': '100%',
        ..._.mapValues(fractions(maxPercentageDenominator, maxPercentageNumerator), value => `${value * 100}%`),
      },

      fontFamily: {
        'default': [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },

      fontWeight: {
        'normal': '400',
      },

      fontSize: {
        'default': pxToRem(16),
      },

      lineHeight: {
        'none': '1',
        'default': '1.5',
      },

      letterSpacing: {
        'default': '0',
      },

      boxShadow: {
        'none': 'none',
        'default': `0 ${pxToRem(1)} ${pxToRem(3)} 0 rgba(0, 0, 0, 0.1), 0 ${pxToRem(1)} ${pxToRem(2)} 0 rgba(0, 0, 0, 0.06)`,
      },

      borderWidth: {
        '0': '0',
        'default': pxToRem(1),
        ...range(2, maxBorderWidth, { unit: 'px' }),
      },

      borderColor: theme => ({
        'default': 'currentColor',
        ...theme('colors'),
      }),

      borderRadius: {
        'none': '0',
        'default': pxToRem(4),
        'full': pxToRem(99999),
      },

      width: theme => ({
        'auto': 'auto',
        ...theme('spacing'),
        ...range(0, maxWidth, { step: widthStep, unit: 'grid' }),
        ...theme('percentages'),
      }),

      height: theme => ({
        'auto': 'auto',
        ...theme('spacing'),
        ...range(0, maxHeight, { step: heightStep, unit: 'grid' }),
        ...theme('percentages'),
      }),

      minWidth: theme => ({
        ...theme('spacing'),
        ...range(0, maxMinWidth, { step: minWidthStep, unit: 'grid' }),
        ...theme('percentages'),
      }),

      minHeight: theme => ({
        ...theme('spacing'),
        ...range(0, maxMinHeight, { step: minHeightStep, unit: 'grid' }),
        ...theme('percentages'),
      }),

      maxWidth: theme => ({
        'none': 'none',
        ...theme('screens'),
        ...theme('spacing'),
        ...range(0, maxMaxWidth, { step: maxWidthStep, unit: 'grid' }),
        ...theme('percentages'),
      }),

      maxHeight: theme => ({
        'none': 'none',
        ...theme('spacing'),
        ...range(0, maxMaxHeight, { step: maxHeightStep, unit: 'grid' }),
        ...theme('percentages'),
      }),

      padding: theme => ({
        ...theme('spacing'),
        ...range(0, maxPadding, { step: paddingStep, unit: 'grid' }),
      }),

      margin: (theme, { negative }) => ({
        'auto': 'auto',
        ...andNegative(negative, {
          ...theme('spacing'),
          ...range(0, maxMargin, { step: marginStep, unit: 'grid' }),
          ...theme('percentages'),
        }),
      }),

      inset: theme => ({
        '0': '0',
        'auto': 'auto',
        ...theme('percentages'),
      }),

      flexGrow: {
        '0': '0',
        'default': '1',
        ...range(2, maxFlexGrow),
      },

      flexShrink: {
        '0': '0',
        'default': '1',
        ...range(2, maxFlexShrink),
      },

      order: {
        'first': '-99999',
        'last': '99999',
        'none': '0',
        ...range(1, maxOrder),
      },

      opacity: {
        ...range(0, 100, { step: opacityStep, divideValueBy: 100 }),
      },

      zIndex: {
        'auto': 'auto',
        ...range(minZIndex, maxZIndex, { step: zIndexStep }),
      },

      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        'fill': '100% 100%',
      },

      listStyleType: {
        'none': 'none',
        'disc': 'disc',
        'circle': 'circle',
        'square': 'square',
        'decimal': 'decimal',
        'decimal-leading-zero': 'decimal-leading-zero',
        'lower-roman': 'lower-roman',
        'upper-roman': 'upper-roman',
        'lower-alpha': 'lower-alpha',
        'upper-alpha': 'upper-alpha',
      },

      textIndent: {
        ...range(0, maxTextIndent, { step: textIndentStep, unit: 'grid' }),
        ...pxSpacing,
        ...emSpacing,
      },

      textShadow: {
        'none': 'none',
        'default': `0 ${pxToRem(1)} ${pxToRem(3)} rgba(0, 0, 0, 0.2)`,
      },

      columnCount: [
        ...rangeArray(1, maxColumnCount),
      ],

      columnGap: {
        ...range(0, maxColumnGap, { step: columnGapStep, unit: 'grid' }),
        ...pxSpacing,
        ...emSpacing,
      },

      gap: theme => ({
        ...theme('spacing'),
        ...range(0, maxGap, { step: gapStep, unit: 'grid' }),
      }),

      aspectRatio: {
        '1/1': 1,
        ...fractions(maxAspectRatioDenominator, maxAspectRatioNumerator),
      },

      linearGradients: theme => ({
        colors: theme('colors'),
      }),

      transitionProperty: {
        'none': 'none',
        'all': 'all',
        'color': 'color',
        'bg': 'background-color',
        'border': 'border-color',
        'colors': ['color', 'background-color', 'border-color'],
        'opacity': 'opacity',
        'transform': 'transform',
        'shadow': 'box-shadow',
        'margin': 'margin',
        'width': 'width',
        'height': 'height',
        'padding': 'padding',
        'border-width': 'border-width',
        'box': ['margin', 'width', 'height', 'padding', 'border-width'],
      },

      transitionDuration: {
        '0': '0ms',
        'default': `${transitionDurationStep}ms`,
        ...range(transitionDurationStep * 2, maxTransitionDuration, { step: transitionDurationStep, unit: 'ms' }),
      },

      transitionDelay: {
        ...range(0, maxTransitionDelay, { step: transitionDelayStep, unit: 'ms' }),
      },

      translate: (theme, { negative }) => ({
        '0': '0',
        ...andNegative(negative, {
          'full': '100%',
          ..._.mapValues(fractions(maxTranslateDenominator, maxTranslateNumerator), value => `${value * 100}%`),
        }),
      }),

      scale: {
        ...range(minScale, maxScale, { step: scaleStep, divideValueBy: 100 }),
      },

      rotate: {
        ...range(0, 360 - rotateStep, { step: rotateStep, unit: 'deg' }),
      },

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
        'left-up': {
          direction: 'left-up',
        },
        'left-down': {
          direction: 'left-down',
        },
        'right-up': {
          direction: 'right-up',
        },
        'right-down': {
          direction: 'right-down',
        },
      },

      ...theme,

      extend: extendTheme,
    },

    variants: {
      accessibility: ['responsive'],
      alignContent: defaultVariants,
      alignItems: defaultVariants,
      alignSelf: defaultVariants,
      appearance: defaultVariants,
      backgroundAttachment: defaultVariants,
      backgroundColor: defaultVariants,
      backgroundPosition: defaultVariants,
      backgroundRepeat: defaultVariants,
      backgroundSize: defaultVariants,
      borderCollapse: defaultVariants,
      borderColor: defaultVariants,
      borderRadius: defaultVariants,
      borderStyle: defaultVariants,
      borderWidth: defaultVariants,
      boxShadow: defaultVariants,
      cursor: defaultVariants,
      display: defaultVariants,
      fill: defaultVariants,
      flex: defaultVariants,
      flexDirection: defaultVariants,
      flexGrow: defaultVariants,
      flexShrink: defaultVariants,
      flexWrap: defaultVariants,
      float: defaultVariants,
      fontFamily: defaultVariants,
      fontSize: defaultVariants,
      fontSmoothing: defaultVariants,
      fontStyle: defaultVariants,
      fontWeight: defaultVariants,
      height: ['responsive'],
      inset: ['responsive'],
      justifyContent: defaultVariants,
      letterSpacing: defaultVariants,
      lineHeight: defaultVariants,
      listStylePosition: defaultVariants,
      listStyleType: defaultVariants,
      margin: ['responsive'],
      maxHeight: ['responsive'],
      maxWidth: ['responsive'],
      minHeight: ['responsive'],
      minWidth: ['responsive'],
      objectFit: defaultVariants,
      objectPosition: defaultVariants,
      opacity: defaultVariants,
      order: defaultVariants,
      outline: defaultVariants,
      overflow: defaultVariants,
      padding: ['responsive'],
      placeholderColor: defaultVariants,
      pointerEvents: defaultVariants,
      position: defaultVariants,
      resize: defaultVariants,
      stroke: defaultVariants,
      tableLayout: defaultVariants,
      textAlign: defaultVariants,
      textColor: defaultVariants,
      textDecoration: defaultVariants,
      textTransform: defaultVariants,
      userSelect: defaultVariants,
      verticalAlign: defaultVariants,
      visibility: defaultVariants,
      whitespace: defaultVariants,
      width: ['responsive'],
      wordBreak: defaultVariants,
      zIndex: defaultVariants,

      textIndent: ['responsive'],
      textShadow: defaultVariants,
      ellipsis: ['responsive'],
      hyphens: ['responsive'],
      textUnset: ['responsive'],
      caps: ['responsive'],
      nums: ['responsive'],
      ligatures: ['responsive'],

      columnCount: ['responsive'],
      columnGap: ['responsive'],
      columnWidth: ['responsive'],
      columnRuleColor: ['responsive'],
      columnRuleWidth: ['responsive'],
      columnRuleStyle: ['responsive'],
      columnFill: ['responsive'],
      columnSpan: ['responsive'],

      gap: ['responsive'],

      aspectRatio: ['responsive'],

      linearGradients: ['responsive'],

      transitionProperty: defaultVariants,
      transitionDuration: defaultVariants,
      transitionTimingFunction: defaultVariants,
      transitionDelay: defaultVariants,
      willChange: defaultVariants,

      transform: defaultVariants,
      transformOrigin: defaultVariants,
      translate: defaultVariants,
      scale: defaultVariants,
      rotate: defaultVariants,
      skew: defaultVariants,
      perspective: defaultVariants,
      perspectiveOrigin: defaultVariants,
      transformStyle: defaultVariants,
      backfaceVisibility: defaultVariants,
      transformBox: defaultVariants,

      filter: defaultVariants,
      backdropFilter: defaultVariants,

      mixBlendMode: defaultVariants,
      backgroundBlendMode: defaultVariants,
      isolation: defaultVariants,

      fluidContainer: ['responsive'],

      triangles: ['responsive'],

      ...variants,
    },

    corePlugins: {
      container: false,
      ...corePlugins,
    },

    plugins: [
      function({ addBase }) {
        addBase({
          'html': {
            fontSize: `calc(${rootFontSize / 16}rem)`,
          },
        });
      },

      ...(enableReset ? [resetPlugin()] : []),

      typographyPlugin(),

      multiColumnPlugin(),

      gapPlugin({
        legacy: gapLegacy,
      }),

      aspectRatioPlugin(),

      gradientsPlugin(),

      transitionsPlugin(),

      transformsPlugin({
        '3d': enable3dTransforms,
      }),

      filtersPlugin(),

      blendModePlugin(),

      fluidContainerPlugin(),

      trianglesPlugin(),

      interactionVariantsPlugin(),
      
      childrenPlugin(),

      ...plugins,
    ],
  };
};
