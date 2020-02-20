# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project mostly adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2020-02-19

### Changed
- Updated plugins to their latest version

## [3.0.0-beta.3] - 2020-02-14

### Added
- Re-added the `transform-style`, `backface-visibility`, `transform-box`, `transition-delay`, and `will-change` utilities which were temporarily removed in beta 1

### Changed
- Updated plugins to their latest version

## [3.0.0-beta.2] - 2020-02-06

### Fixed
- Fixed the transition property utilities with more than one CSS property

## [3.0.0-beta.1] - 2020-02-06

### Added
- Added `maxLineHeight` and `lineHeightStep` options that default to `40` and `1` respectively
- Added `maxTranslate` and `translateStep` options that default to `200` and `5` respectively
- Added `minSkew`, `maxSkew`, and `skewStep` options that default to `-45`, `45`, and `5` respectively
- Added `min-w-auto` and `min-h-auto` utilities

### Changed
- Changed the default value of `gridResolution` from `1` to `4`
- Changed the default value of `maxPxSpacing` from `0` to `16`
- Changed the default value of `maxBorderWidth` from `20` to `40`
- Changed the default value of `rotateStep` from `45` to `5`
- Updated plugins to their latest version

### Removed
- Removed the deprecated `tailwindcss-transforms` and `tailwindcss-transitions` plugins, since Tailwind 1.2 comes with transform and transition utilities
- Removed the `enable3dTransforms` option, and as a result 3D transform utilities are no longer generated
- Temporarily removed `transform-style`, `backface-visibility`, `transform-box`, `transition-delay`, and `will-change` utilities

## [2.2.7] - 2020-02-03

### Changed
- The root `font-size` is now declared in `%` instead of `rem`
- Updated `tailwindcss-transitions` to `2.2.0`

## [2.2.6] - 2020-01-07

### Added
- Added the `tailwindcss-background-extended` plugin
- Added `fill` and `stroke` utilities for all the theme colors by default

## [2.2.5] - 2020-01-02

### Added
- Added `minRotate` and `maxRotate` options that default to `-360` and `360` respectively

## [2.2.4] - 2019-12-20

### Added
- Added the `tailwindcss-alt` plugin

## [2.2.3] - 2019-12-15

### Added
- Added `infinity` and `-infinity` insets (`99999px` and `-99999px`)

## [2.2.2] - 2019-11-29

### Added
- Added `maxVwDenominator` and `maxVhDenominator` options that both default to `4`

### Removed
- Removed the `maxVwSpacing`, `vwSpacingStep`, `maxVhSpacing`, and `vhSpacingStep` options

### Fixed
- Fixed utilities that used `vw` and `vh` units (`1/2vw` now correctly translates to `50vw` instead of `0.5vw` which is 5/1000th of the view width)

## [2.2.1] - 2019-11-27

### Removed
- Removed the `defaultTransitionDuration` and `defaultAnimationDuration` options (those can already be customized with `extendTheme`)

## [2.2.0] - 2019-11-26

### Added
- Added an `extendVariants` option

### Changed
- Changed the default value of `maxPercentageDenominator` and `maxPercentageNumerator` from `12` to `16`
- Changed the default value of `maxFlexGrow` and `maxFlexShrink` from `10` to `12`
- Changed the default value of `transitionDurationStep` and `animationDurationStep` from `250` to `50`
- Changed the `ellipsis`, `hyphens`, `textUnset`, `caps`, `nums`, `ligatures`, `fluidContainer`, and `triangles` utilities to use the `defaultVariants` by default rather than only the responsive variant

## [2.1.1] - 2019-11-13

### Changed
- Changed the default value of `maxFlexGrow` and `maxFlexShrink` from `5` to `10`

### Removed
- Removed the `normal` font weight; once again, there are no font weights by default

### Fixed
- Fixed an issue where a `gridResolution` greater than `1` would not generate all the expected utilities

## [2.1.0] - 2019-11-10

### Added
- Added a `borderWidthStep` option that defaults to `1`

### Changed
- The following options now take the value of `gridResolution` into account: `maxGridSpacing` (meaning the default value of `400` effectively becomes `100` when `gridResolution` is set to `4`), `maxWidth`, `widthStep`, `maxHeight`, `heightStep`, `maxMinWidth`, `minWidthStep`, `maxMinHeight`, `minHeightStep`, `maxMaxWidth`, `maxWidthStep`, `maxMaxHeight`, `maxHeightStep`, `maxPadding`, `paddingStep`, `maxMargin`, `marginStep`, `maxTextIndent`, `textIndentStep`, `maxColumnGap`, `columnGapStep`, `maxGap`, and `gapStep`

## [2.0.1] - 2019-10-01

### Fixed
- Changed the default value of `rootFontSize` from `1` to `100` to prevent layout issues when Chrome’s and Safari’s “minimum font size” setting is used

## [2.0.0] - 2019-09-29

### Added
- Added the `tailwindcss-animations` plugin along with the `defaultAnimationDuration`, `maxAnimationDuration`, `animationDurationStep`, `maxAnimationDelay`, and `animationDelayStep` options
- Added a `defaultTransitionDuration` option that defaults to `250`

## [2.0.0-beta.5] - 2019-09-02

### Changed
- The root `font-size` is now declared in `rem` instead of `px` to take the user’s preferred font size into account
- Changed the default value of `important` from `false` to `'#a'` to boost the specificity of generated utilities
- Updated dependencies

### Removed
- Removed the `tailwindcss-accessibility` plugin since screen reader utilities are now built into Tailwind

## [2.0.0-beta.4] - 2019-07-19

### Added
- Added a `minZIndex` option that defaults to `-10`, adding a `-z-10` utility
- Added a `bg-fill` utility (`background-size: 100% 100%`)

### Changed
- Added `group-focus` and `group-active` to the default variants

## [2.0.0-beta.3] - 2019-07-10

### Added
- Added more transition property utilities
- Added more triangle components

### Changed
- Text indent and column gap utilities are now also generated in the `px` and `em` scales

## [2.0.0-beta.2] - 2019-07-10

### Added
- Added a `pxSpacingStep` option that defaults to `1`

### Changed
- Re-added a default font weight, renamed from `regular` to `normal`

### Removed
- Removed the `2xs` screen

### Fixed
- Added the missing text shadow utilities (`none` and `default`)

## [2.0.0-beta.1] - 2019-07-10

### Added
- Tailwind 1.0 compatibility
- Added `maxEmSpacing` and `emSpacingStep` options that default to `2` and `0.25` respectively
- Added `maxVwSpacing` and `vwSpacingStep` options that default to `1` and `0.25` respectively
- Added `maxVhSpacing` and `vhSpacingStep` options that default to `1` and `0.25` respectively
- Added `maxAspectRatioDenominator` and `maxAspectRatioNumerator` options that both default to `20`
- Added `maxTranslateDenominator` and `maxTranslateNumerator` options that both default to `4`
- Added a `gapStep` option that defaults to `5`
- Added a `gapLegacy` option that defaults to `false`
- Added a `opacityStep` option that defaults to `5`
- Added a `zIndexStep` option that defaults to `10`
- Added a `textIndentStep` option that defaults to `1`
- Added a `maxColumnCount` option that defaults to `5`
- Added a `columnGapStep` option that defaults to `5`
- Added a `transitionDurationStep` option that defaults to `250`
- Added `maxTransitionDelay` and `transitionDelayStep` options that default to `2000` and `250` respectively
- Added a `minScale` option that defaults to `-100`
- Added a `scaleStep` option that defaults to `5`
- Added a `rotateStep` option that defaults to `45`
- Added a `enable3dTransforms` option that defaults to `true`
- Added a `enableReset` option that defaults to `true`

### Changed
- Changed the default value of `rootFontSize` from `16` to `1`
- Removed all the options that were theme objects (e.g. `screens`, `colors`, `fonts`, etc.) in favor of the new `theme` and `extendTheme` options
- Removed the `maxGridSizeBeforeSkipping` option in favor of `maxGridSpacing`
- Removed the `maxGridSize` option in favor of separate `maxWidth`, `maxHeight`, `maxMinWidth`, `maxMinHeight`, `maxMaxWidth`, `maxMaxHeight`, `maxPadding`, and `maxMargin` options
- Removed the `gridSizeStepAfterSkipping` option in favor of `widthStep`, `heightStep`, `minWidthStep`, `minHeightStep`, etc.
- Renamed the `maxPxSize` option to `maxPxSpacing`
- Renamed the `maxDenominator` option to `maxPercentageDenominator`
- Renamed the `maxNumerator` option to `maxPercentageNumerator` and changed its default value from `6` to `12`
- Changed the default value of `maxBorderWidth` from `16` to `20`
- Gap utilities are now generated in the grid scale in addition to using `maxGap` (which now defaults to `null`) and `gapStep`
- Changed the default value of `maxOrder` from `5` to `12`
- Renamed the `maxIndent` option to `maxTextIndent`
- Changed the default value of `maxColumnGap` from `100` to `200`
- Renamed the `allVariants` option to `defaultVariants`
- Removed the `modules` option in favor of `variants` and `corePlugins`
- Removed the `tailwindOptions` option in favor of `prefix`, `important`, and `separator`
- Renamed the `xxs` screen to `2xs`
- Changed all the screen values; screens `sm` to `xl` now use Tailwind’s default values
- Changed the default border color from `black` to `currentColor`
- Changed `*-current-color` classes (e.g. `bg-current-color`) to `*-current`
- Changed the `*-em` classes (e.g. `w-em`) to `*-1em`
- Changed the `*-screen` classes and `*-screen-1/2` classes to `*-1vw` / `*-1vh` and `*-1/2vw` / `*-1/2vh`, respectively
- The reset and the root font size are now included in the generated CSS, no need to import/specify them manually

### Removed
- Removed the deprecated `tailwindcss-list-style` plugin
- Removed the `maxDenominatorDifference` and `extraPercentages` options
- Removed the `maxFixedPxSize` option
- Removed the `components`, `utilities`, and `utilityVariants` options
- Removed the `regular` font weight, there are no font weights by default anymore
- Removed the `tight` and `loose` leadings
- Removed the `tight` and `wide` trackings

## [1.2.9] - 2019-04-03

### Changed
- Small reset improvements

### Fixed
- Fixed reset issue on Windows where `select` options had white text on white background when the `select` had (or inherited) white text on a transparent background

## [1.2.8] - 2019-03-29

### Changed
- Updated `tailwindcss-gap` to `2.0.0`

## [1.2.7] - 2019-03-29

### Changed
- Multiple reset improvements

## [1.2.6] - 2019-03-18

### Added
- Added more aspect ratios

## [1.2.5] - 2019-03-14

### Added
- Added `maxFlexGrow`, `maxFlexShrink`, and `maxOrder` options (all default to `5`)
- Added `em` size (used by width, height, padding, margin, etc.)
- Percentage negative margin utilities are now generated
- Offset utilities are now generated for all percentages, not just `full`
- Added a bunch of common aspect ratios

### Changed
- `maxDenominatorDifference` now defaults to `2` instead of `1`

## [1.2.4] - 2019-03-11

### Added
- Added `none` value to `maxHeight`
- `minWidth`, `minHeight`, `maxWidth`, and `maxHeight` now all have the values `screen` and `screen-1/2`

### Changed
- Most modules/plugins now use the `allVariants` array instead of simply `['responsive']`
- The default value of `utilityVariants` is now the same as `allVariants`

## [1.2.3] - 2019-02-21

### Fixed
- Added a unit to the `0` value of properties that take time values (`transition-duration` and `transition-delay`), since a unitless `0` is invalid even though it works in some browsers

## [1.2.2] - 2019-02-19

### Changed
- Changed the `container` option to `containers`, allowing to generate multiple containers

## [1.2.1] - 2019-02-18

### Added
- Four triangle components are now generated by default (`c-triangle-left`, `c-triangle-right`, `c-triangle-up`, and `c-triangle-down`)
- Added backdrop filter utilities (generated using the existing `filters` option)

### Removed
- Removed the `negativeTranslate` and `negativeRotate` options; the `translate` and `rotate` options are now used to generate both positive and negative utilities

### Fixed
- Added the missing `0` transition duration utility

## [1.2.0] - 2019-02-18

### Added
- Added the `tailwindcss-gap` plugin along with the `maxGap` option
- Added the `tailwindcss-fluid-container` plugin along with the `container` option
- Added the `tailwindcss-triangles` plugin along with the `triangles` option
- Added the `tailwindcss-interaction-variants` plugin; those variants can be used by including them in the new `allVariants` option
- Added the `tailwindcss-list-style` plugin
- Added the `tailwindcss-multi-column` plugin along with the `maxColumnGap` option
- Added the `components`, `utilities`, and `utilityVariant` options to create custom components and utilities
- Added 45-degree rotation increments
- Added `current-color` to the list of gradient colors

### Changed
- Multiple reset improvements

### Removed
- Removed the `tailwindcss-object-fit` and `tailwindcss-object-position` plugins since they were deprecated

## [1.1.7] - 2018-12-14

### Added
- Added an `xxs` screen

## [1.1.6] - 2018-11-28

### Added
- Added `maxNumerator` and `maxDenominatorDifference` options to generate percentages above 100%
- Added an `extraPercentages` option to generate custom percentages

### Changed
- More transform origin utilities are generated by default

## [1.1.5] - 2018-11-28

### Changed
- Removed the `cursor: pointer;` reset on all `a` elements

## [1.1.4] - 2018-11-28

### Fixed
- Added missing `0` scale utilities

## [1.1.3] - 2018-11-28

### Fixed
- Added missing `0` translate utilities, and removed useless `0` negative rotate utility

## [1.1.2] - 2018-11-28

### Changed
- More leading and tracking utilities are generated by default

## [1.1.1] - 2018-11-27

### Changed
- More gradient directions by default

## [1.1.0] - 2018-11-27

### Added
- Added a `gradientDirections` option

### Changed
- Multiple reset improvements
- Gradient class names are slightly shorter

## [1.0.3] - 2018-08-14

### Changed
- More indent utilities are generated by default

## [1.0.2] - 2018-08-14

### Changed
- More scale utilities are generated by default

## [1.0.1] - 2018-08-14

### Fixed
- Fixed escaping in some selectors

## [1.0.0] - 2018-08-13

Initial release

[Unreleased]: https://github.com/benface/tailwindcss-config/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/benface/tailwindcss-config/compare/v3.0.0-beta.3...v3.0.0
[3.0.0-beta.3]: https://github.com/benface/tailwindcss-config/compare/v3.0.0-beta.2...v3.0.0-beta.3
[3.0.0-beta.2]: https://github.com/benface/tailwindcss-config/compare/v3.0.0-beta.1...v3.0.0-beta.2
[3.0.0-beta.1]: https://github.com/benface/tailwindcss-config/compare/v2.2.7...v3.0.0-beta.1
[2.2.7]: https://github.com/benface/tailwindcss-config/compare/v2.2.6...v2.2.7
[2.2.6]: https://github.com/benface/tailwindcss-config/compare/v2.2.5...v2.2.6
[2.2.5]: https://github.com/benface/tailwindcss-config/compare/v2.2.4...v2.2.5
[2.2.4]: https://github.com/benface/tailwindcss-config/compare/v2.2.3...v2.2.4
[2.2.3]: https://github.com/benface/tailwindcss-config/compare/v2.2.2...v2.2.3
[2.2.2]: https://github.com/benface/tailwindcss-config/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/benface/tailwindcss-config/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/benface/tailwindcss-config/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/benface/tailwindcss-config/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/benface/tailwindcss-config/compare/v2.0.1...v2.1.0
[2.0.1]: https://github.com/benface/tailwindcss-config/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/benface/tailwindcss-config/compare/v2.0.0-beta.5...v2.0.0
[2.0.0-beta.5]: https://github.com/benface/tailwindcss-config/compare/v2.0.0-beta.4...v2.0.0-beta.5
[2.0.0-beta.4]: https://github.com/benface/tailwindcss-config/compare/v2.0.0-beta.3...v2.0.0-beta.4
[2.0.0-beta.3]: https://github.com/benface/tailwindcss-config/compare/v2.0.0-beta.2...v2.0.0-beta.3
[2.0.0-beta.2]: https://github.com/benface/tailwindcss-config/compare/v2.0.0-beta.1...v2.0.0-beta.2
[2.0.0-beta.1]: https://github.com/benface/tailwindcss-config/compare/v1.2.9...v2.0.0-beta.1
[1.2.9]: https://github.com/benface/tailwindcss-config/compare/v1.2.8...v1.2.9
[1.2.8]: https://github.com/benface/tailwindcss-config/compare/v1.2.7...v1.2.8
[1.2.7]: https://github.com/benface/tailwindcss-config/compare/v1.2.6...v1.2.7
[1.2.6]: https://github.com/benface/tailwindcss-config/compare/v1.2.5...v1.2.6
[1.2.5]: https://github.com/benface/tailwindcss-config/compare/v1.2.4...v1.2.5
[1.2.4]: https://github.com/benface/tailwindcss-config/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/benface/tailwindcss-config/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/benface/tailwindcss-config/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/benface/tailwindcss-config/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/benface/tailwindcss-config/compare/v1.1.7...v1.2.0
[1.1.7]: https://github.com/benface/tailwindcss-config/compare/v1.1.6...v1.1.7
[1.1.6]: https://github.com/benface/tailwindcss-config/compare/v1.1.5...v1.1.6
[1.1.5]: https://github.com/benface/tailwindcss-config/compare/v1.1.4...v1.1.5
[1.1.4]: https://github.com/benface/tailwindcss-config/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/benface/tailwindcss-config/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/benface/tailwindcss-config/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/benface/tailwindcss-config/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/benface/tailwindcss-config/compare/v1.0.3...v1.1.0
[1.0.3]: https://github.com/benface/tailwindcss-config/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/benface/tailwindcss-config/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/benface/tailwindcss-config/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/benface/tailwindcss-config/releases/tag/v1.0.0
