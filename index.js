const _ = require('lodash');
const num2fraction = require('num2fraction');
const defaultTheme = require('tailwindcss/defaultTheme');
const resetPlugin = require('@benface/tailwindcss-reset');
const typographyPlugin = require('tailwindcss-typography');
const multiColumnPlugin = require('tailwindcss-multi-column');
const gapPlugin = require('tailwindcss-gap');
const aspectRatioPlugin = require('tailwindcss-aspect-ratio');
const gradientsPlugin = require('tailwindcss-gradients');
const transformsPlugin = require('tailwindcss-transforms');
const transitionsPlugin = require('tailwindcss-transitions');
const animationsPlugin = require('tailwindcss-animations');
const filtersPlugin = require('tailwindcss-filters');
const blendModePlugin = require('tailwindcss-blend-mode');
const fluidContainerPlugin = require('tailwindcss-fluid-container');
const trianglesPlugin = require('tailwindcss-triangles');
const interactionVariantsPlugin = require('tailwindcss-interaction-variants');
const childrenPlugin = require('tailwindcss-children');

module.exports = ({
  rootFontSize = 100,

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
  borderWidthStep = 1,
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
  minScale = -100,
  maxScale = 200,
  scaleStep = 5,
  rotateStep = 45,
  enable3dTransforms = true,
  defaultTransitionDuration = 250,
  maxTransitionDuration = 2000,
  transitionDurationStep = 250,
  maxTransitionDelay = 2000,
  transitionDelayStep = 250,
  defaultAnimationDuration = 1000,
  maxAnimationDuration = 5000,
  animationDurationStep = 250,
  maxAnimationDelay = 2000,
  animationDelayStep = 250,
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

  const range = (start, end, step = 1, {
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

  const gridRange = (start, end, step = 1) => {
    start = Math.ceil(start / gridResolution);
    end = Math.ceil(end / gridResolution);
    step = Math.ceil(step / gridResolution);
    return range(start, end, step, { unit: 'grid' });
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

  const gridSpacing = gridRange(0, maxGridSpacing);
  const pxSpacing = range(0, maxPxSpacing, pxSpacingStep, { unit: 'px', includeUnitInKey: true });
  const emSpacing = range(0, maxEmSpacing, emSpacingStep, { unit: 'em', includeUnitInKey: true });
  const vwSpacing = range(0, maxVwSpacing, vwSpacingStep, { unit: 'vw', includeUnitInKey: true });
  const vhSpacing = range(0, maxVhSpacing, vhSpacingStep, { unit: 'vh', includeUnitInKey: true });

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
        ...range(2, maxBorderWidth, borderWidthStep, { unit: 'px' }),
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
        ...gridRange(0, maxWidth, widthStep),
        ...theme('percentages'),
      }),

      height: theme => ({
        'auto': 'auto',
        ...theme('spacing'),
        ...gridRange(0, maxHeight, heightStep),
        ...theme('percentages'),
      }),

      minWidth: theme => ({
        ...theme('spacing'),
        ...gridRange(0, maxMinWidth, minWidthStep),
        ...theme('percentages'),
      }),

      minHeight: theme => ({
        ...theme('spacing'),
        ...gridRange(0, maxMinHeight, minHeightStep),
        ...theme('percentages'),
      }),

      maxWidth: theme => ({
        'none': 'none',
        ...theme('screens'),
        ...theme('spacing'),
        ...gridRange(0, maxMaxWidth, maxWidthStep),
        ...theme('percentages'),
      }),

      maxHeight: theme => ({
        'none': 'none',
        ...theme('spacing'),
        ...gridRange(0, maxMaxHeight, maxHeightStep),
        ...theme('percentages'),
      }),

      padding: theme => ({
        ...theme('spacing'),
        ...gridRange(0, maxPadding, paddingStep),
      }),

      margin: (theme, { negative }) => ({
        'auto': 'auto',
        ...andNegative(negative, {
          ...theme('spacing'),
          ...gridRange(0, maxMargin, marginStep),
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
        ...range(0, 100, opacityStep, { divideValueBy: 100 }),
      },

      zIndex: {
        'auto': 'auto',
        ...range(minZIndex, maxZIndex, zIndexStep),
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
        ...gridRange(0, maxTextIndent, textIndentStep),
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
        ...gridRange(0, maxColumnGap, columnGapStep),
        ...pxSpacing,
        ...emSpacing,
      },

      gap: theme => ({
        ...theme('spacing'),
        ...gridRange(0, maxGap, gapStep),
      }),

      aspectRatio: {
        '1/1': 1,
        ...fractions(maxAspectRatioDenominator, maxAspectRatioNumerator),
      },

      linearGradients: theme => ({
        colors: theme('colors'),
      }),

      translate: (theme, { negative }) => ({
        '0': '0',
        ...andNegative(negative, {
          'full': '100%',
          ..._.mapValues(fractions(maxTranslateDenominator, maxTranslateNumerator), value => `${value * 100}%`),
        }),
      }),

      scale: {
        ...range(minScale, maxScale, scaleStep, { divideValueBy: 100 }),
      },

      rotate: {
        ...range(0, 360 - rotateStep, rotateStep, { unit: 'deg' }),
      },

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
        'default': `${defaultTransitionDuration}ms`,
        ...range(0, maxTransitionDuration, transitionDurationStep, { unit: 'ms' }),
      },

      transitionDelay: {
        ...range(0, maxTransitionDelay, transitionDelayStep, { unit: 'ms' }),
      },

      animationDuration: {
        'default': `${defaultAnimationDuration}ms`,
        ...range(0, maxAnimationDuration, animationDurationStep, { unit: 'ms' }),
      },

      animationDelay: {
        ...range(0, maxAnimationDelay, animationDelayStep, { unit: 'ms' }),
      },

      animationFillMode: {
        'default': 'both',
        'none': 'none',
        'forwards': 'forwards',
        'backwards': 'backwards',
        'both': 'both',
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

      transformsPlugin({
        '3d': enable3dTransforms,
      }),

      transitionsPlugin(),

      animationsPlugin(),

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
