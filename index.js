const _ = require('lodash');
const deepmerge = require('deepmerge');
const num2fraction = require('num2fraction');
const defaultTheme = require('tailwindcss/defaultTheme');
const resetPlugin = require('@benface/tailwindcss-reset');
const typographyPlugin = require('tailwindcss-typography');
const gapPlugin = require('tailwindcss-gap');
const animationsPlugin = require('tailwindcss-animations');
const backgroundExtendedPlugin = require('tailwindcss-background-extended');
const gradientsPlugin = require('tailwindcss-gradients');
const filtersPlugin = require('tailwindcss-filters');
const blendModePlugin = require('tailwindcss-blend-mode');
const aspectRatioPlugin = require('tailwindcss-aspect-ratio');
const multiColumnPlugin = require('tailwindcss-multi-column');
const fluidContainerPlugin = require('tailwindcss-fluid-container');
const trianglesPlugin = require('tailwindcss-triangles');
const interactionVariantsPlugin = require('tailwindcss-interaction-variants');
const childrenPlugin = require('tailwindcss-children');
const altPlugin = require('tailwindcss-alt');

module.exports = ({
  rootFontSize = 100,

  gridResolution = 4,
  maxGridSpacing = 400,
  maxPxSpacing = 16,
  pxSpacingStep = 1,
  maxEmSpacing = 2,
  emSpacingStep = 0.25,
  maxVwDenominator = 4,
  maxVhDenominator = 4,
  maxPercentageDenominator = 16,
  maxPercentageNumerator = 16,
  maxAspectRatioDenominator = 20,
  maxAspectRatioNumerator = 20,
  maxTranslateDenominator = 4,
  maxTranslateNumerator = 4,

  maxLineHeight = 40,
  lineHeightStep = 1,
  maxTextIndent = 40,
  textIndentStep = 1,
  maxBorderWidth = 40,
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
  maxGap = null,
  gapStep = 5,
  gapLegacy = false,
  maxFlexGrow = 12,
  maxFlexShrink = 12,
  maxOrder = 12,
  opacityStep = 5,
  minZIndex = -10,
  maxZIndex = 100,
  zIndexStep = 10,
  minScale = -100,
  maxScale = 200,
  scaleStep = 5,
  minRotate = -360,
  maxRotate = 360,
  rotateStep = 5,
  maxTranslate = 200,
  translateStep = 5,
  minSkew = -45,
  maxSkew = 45,
  skewStep = 5,
  maxTransitionDuration = 2000,
  transitionDurationStep = 50,
  maxTransitionDelay = 2000,
  transitionDelayStep = 250,
  maxAnimationDuration = 5000,
  animationDurationStep = 50,
  maxAnimationDelay = 2000,
  animationDelayStep = 250,
  maxColumnCount = 5,
  maxColumnGap = 200,
  columnGapStep = 5,
  enableReset = true,

  defaultVariants = ['responsive', 'hover', 'group-hover', 'focus', 'group-focus', 'active', 'group-active'],
  
  prefix = '',
  important = '#a',
  separator = ':',
  theme = {},
  extendTheme = {},
  variants = {},
  extendVariants = {},
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
        value = value * multiplyValueBy / divideValueBy;
        if (unit === 'grid' || unit === 'px') {
          if (unit === 'grid') {
            value *= gridResolution;
          }
          value = pxToRem(value);
        }
        else if (unit && (value !== 0 || ['s', 'ms'].includes(unit))) {
          value += unit;
        }
        return [key, value.toString()];
      })
    );
  };

  const gridRange = (start, end, step = 1) => {
    start = Math.ceil(start / gridResolution);
    end = Math.ceil(end / gridResolution);
    step = Math.max(Math.floor(step / gridResolution), 1);
    return range(start, end, step, { unit: 'grid' });
  };

  const fractions = (maxDenominator, maxNumerator = 1, {
    unit = null,
    includeUnitInKey = false,
    multiplyValueBy = 1,
    divideValueBy = 1,
    keywords = {},
  } = {}) => {
    const fractions = {};
    for (let denominator = 1; denominator <= Math.max(maxDenominator, maxNumerator); denominator ++) {
      for (let numerator = 1; numerator <= Math.max(maxDenominator, maxNumerator); numerator ++) {
        if ((numerator < denominator && denominator > maxDenominator) || (numerator > denominator && numerator > maxNumerator)) {
          continue;
        }
        let key = `${numerator}/${denominator}`;
        if (keywords.hasOwnProperty(key)) {
          key = keywords[key];
        }
        else if (unit && includeUnitInKey) {
          key += unit;
        }
        let value = numerator / denominator * multiplyValueBy / divideValueBy;
        if (unit) {
          value += unit;
        }
        if (Object.values(fractions).includes(value)) {
          continue;
        }
        fractions[key] = value.toString();
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
  const vwSpacing = fractions(maxVwDenominator, 1, { unit: 'vw', includeUnitInKey: true, multiplyValueBy: 100, keywords: { '1/1': '1vw' } });
  const vhSpacing = fractions(maxVhDenominator, 1, { unit: 'vh', includeUnitInKey: true, multiplyValueBy: 100, keywords: { '1/1': '1vh' } });

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
        ...fractions(maxPercentageDenominator, maxPercentageNumerator, { unit: '%', multiplyValueBy: 100, keywords: { '1/1': 'full' } }),
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
        ...gridRange(1, maxLineHeight, lineHeightStep),
      },

      letterSpacing: {
        'default': '0',
      },

      textIndent: {
        ...gridRange(0, maxTextIndent, textIndentStep),
        ...pxSpacing,
        ...emSpacing,
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

      textShadow: {
        'none': 'none',
        'default': `0 ${pxToRem(1)} ${pxToRem(3)} rgba(0, 0, 0, 0.2)`,
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

      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        'fill': '100% 100%',
      },

      fill: theme => theme('colors'),

      stroke: theme => theme('colors'),

      strokeWidth: theme => ({
        '1': pxToRem(1),
        ...theme('borderWidth'),
      }),

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
        'auto': 'auto',
        ...theme('spacing'),
        ...gridRange(0, maxMinWidth, minWidthStep),
        ...theme('percentages'),
      }),

      minHeight: theme => ({
        'auto': 'auto',
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
        'infinity': pxToRem(99999),
        '-infinity': `-${pxToRem(99999)}`,
        ...theme('percentages'),
      }),

      gap: theme => ({
        ...theme('spacing'),
        ...gridRange(0, maxGap, gapStep),
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

      scale: {
        ...range(minScale, maxScale, scaleStep, { divideValueBy: 100 }),
      },

      rotate: {
        ...range(minRotate, maxRotate, rotateStep, { unit: 'deg' }),
      },

      translate: (theme, { negative }) => ({
        '0': '0',
        ...andNegative(negative, {
          ...gridRange(0, maxTranslate, translateStep),
          ...fractions(maxTranslateDenominator, maxTranslateNumerator, { unit: '%', multiplyValueBy: 100, keywords: { '1/1': 'full' } }),
        }),
      }),

      skew: {
        ...range(minSkew, maxSkew, skewStep, { unit: 'deg' }),
      },

      // TODO: Add missing transform utilities in custom plugin

      transitionProperty: {
        'none': 'none',
        'all': 'all',
        'default': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
        'colors': 'background-color, border-color, color, fill, stroke',
        'bg': 'background-color',
        'border': 'border-color',
        'color': 'color',
        'opacity': 'opacity',
        'shadow': 'box-shadow',
        'transform': 'transform',
        'margin': 'margin',
        'width': 'width',
        'height': 'height',
        'padding': 'padding',
        'border-width': 'border-width',
        'box': 'margin, width, height, padding, border-width',
      },

      transitionDuration: {
        '25': '25ms',
        '50': '50ms',
        '75': '75ms',
        ...range(0, maxTransitionDuration, transitionDurationStep, { unit: 'ms' }),
      },

      // TODO: Replace by a custom plugin
      /*
      transitionDelay: {
        ...range(0, maxTransitionDelay, transitionDelayStep, { unit: 'ms' }),
      },
      */

      // TODO: Add missing will-change utilities in custom plugin

      animationDuration: {
        'default': '1000ms',
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

      linearGradients: theme => ({
        colors: theme('colors'),
      }),

      aspectRatio: {
        ...fractions(maxAspectRatioDenominator, maxAspectRatioNumerator),
      },

      columnCount: [
        ...Object.values(range(1, maxColumnCount)),
      ],

      columnGap: {
        ...gridRange(0, maxColumnGap, columnGapStep),
        ...pxSpacing,
        ...emSpacing,
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

    variants: deepmerge({
      accessibility: defaultVariants,
      alignContent: ['responsive'],
      alignItems: ['responsive'],
      alignSelf: ['responsive'],
      appearance: defaultVariants,
      backgroundAttachment: defaultVariants,
      backgroundColor: defaultVariants,
      backgroundPosition: defaultVariants,
      backgroundRepeat: defaultVariants,
      backgroundSize: defaultVariants,
      borderCollapse: ['responsive'],
      borderColor: defaultVariants,
      borderRadius: defaultVariants,
      borderStyle: defaultVariants,
      borderWidth: defaultVariants,
      boxShadow: defaultVariants,
      boxSizing: ['responsive'],
      cursor: ['responsive'],
      display: defaultVariants,
      fill: defaultVariants,
      flex: defaultVariants,
      flexDirection: ['responsive'],
      flexGrow: ['responsive'],
      flexShrink: ['responsive'],
      flexWrap: ['responsive'],
      float: ['responsive'],
      clear: ['responsive'],
      fontFamily: defaultVariants,
      fontSize: defaultVariants,
      fontSmoothing: ['responsive'],
      fontStyle: defaultVariants,
      fontWeight: defaultVariants,
      height: ['responsive'],
      inset: ['responsive'],
      justifyContent: ['responsive'],
      letterSpacing: defaultVariants,
      lineHeight: defaultVariants,
      listStylePosition: ['responsive'],
      listStyleType: ['responsive'],
      margin: ['responsive'],
      maxHeight: ['responsive'],
      maxWidth: ['responsive'],
      minHeight: ['responsive'],
      minWidth: ['responsive'],
      objectFit: defaultVariants,
      objectPosition: defaultVariants,
      opacity: defaultVariants,
      order: ['responsive'],
      outline: defaultVariants,
      overflow: defaultVariants,
      padding: ['responsive'],
      placeholderColor: defaultVariants,
      pointerEvents: ['responsive'],
      position: ['responsive'],
      resize: ['responsive'],
      stroke: defaultVariants,
      strokeWidth: defaultVariants,
      tableLayout: ['responsive'],
      textAlign: defaultVariants,
      textColor: defaultVariants,
      textDecoration: defaultVariants,
      textTransform: defaultVariants,
      userSelect: ['responsive'],
      verticalAlign: ['responsive'],
      visibility: defaultVariants,
      whitespace: ['responsive'],
      width: ['responsive'],
      wordBreak: ['responsive'],
      zIndex: defaultVariants,
      gap: ['responsive'],
      gridAutoFlow: ['responsive'],
      gridTemplateColumns: ['responsive'],
      gridColumn: ['responsive'],
      gridColumnStart: ['responsive'],
      gridColumnEnd: ['responsive'],
      gridTemplateRows: ['responsive'],
      gridRow: ['responsive'],
      gridRowStart: ['responsive'],
      gridRowEnd: ['responsive'],
      transform: ['responsive'],
      transformOrigin: ['responsive'],
      scale: defaultVariants,
      rotate: defaultVariants,
      translate: defaultVariants,
      skew: defaultVariants,
      transitionProperty: ['responsive'],
      transitionTimingFunction: ['responsive'],
      transitionDuration: ['responsive'],

      textIndent: ['responsive'],
      textShadow: defaultVariants,
      ellipsis: ['responsive'],
      hyphens: ['responsive'],
      kerning: ['responsive'],
      textUnset: ['responsive'],
      fontVariantCaps: ['responsive'],
      fontVariantNumeric: ['responsive'],
      fontVariantLigatures: ['responsive'],
      textRendering: ['responsive'],

      animations: defaultVariants,
      animationTimingFunction: ['responsive'],
      animationDuration: ['responsive'],
      animationDelay: ['responsive'],
      animationIterationCount: ['responsive'],
      animationDirection: ['responsive'],
      animationFillMode: ['responsive'],
      animationPlayState: defaultVariants,

      backgroundImage: defaultVariants,
      backgroundClip: defaultVariants,
      backgroundOrigin: defaultVariants,

      linearGradients: ['responsive'],
      radialGradients: ['responsive'],
      conicGradients: ['responsive'],
      repeatingLinearGradients: ['responsive'],
      repeatingRadialGradients: ['responsive'],
      repeatingConicGradients: ['responsive'],

      filter: defaultVariants,
      backdropFilter: defaultVariants,

      mixBlendMode: defaultVariants,
      backgroundBlendMode: defaultVariants,
      isolation: ['responsive'],

      aspectRatio: ['responsive'],

      columnCount: ['responsive'],
      columnGap: ['responsive'],
      columnWidth: ['responsive'],
      columnRuleColor: ['responsive'],
      columnRuleWidth: ['responsive'],
      columnRuleStyle: ['responsive'],
      columnFill: ['responsive'],
      columnSpan: ['responsive'],

      fluidContainer: ['responsive'],

      triangles: defaultVariants,

      ...variants,
    }, extendVariants),

    corePlugins: {
      container: false,
      ...corePlugins,
    },

    plugins: [
      function({ addBase }) {
        addBase({
          'html': {
            fontSize: `${rootFontSize / 16 * 100}%`,
          },
        });
      },

      ...(enableReset ? [resetPlugin] : []),

      typographyPlugin,

      gapPlugin({
        legacy: gapLegacy,
      }),

      animationsPlugin,

      backgroundExtendedPlugin(),

      gradientsPlugin,

      filtersPlugin,

      blendModePlugin(),

      aspectRatioPlugin(),

      multiColumnPlugin(),

      fluidContainerPlugin,

      trianglesPlugin,

      interactionVariantsPlugin,
      
      childrenPlugin,

      altPlugin,

      ...plugins,
    ],
  };
};
