# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project mostly adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

### Removed
- Removed the `tailwindcss-object-fit` and `tailwindcss-object-position` plugins since they were deprecated

### Changed
- Multiple reset improvements

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

[Unreleased]: https://github.com/benface/tailwindcss-config/compare/v2.0.0-beta.3...HEAD
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
