import { Color, ColorBlendMode, knockout } from 'cesium';
import { Viewer } from 'resium';

export const ModelColoring = () => {
  const getColorBlendMode = (colorBlendMode) => {
    return ColorBlendMode[colorBlendMode.toUpperCase()];
  }

  const getColor = (colorName, alpha) => {
    const color = Color[colorName.toUpperCase()];
    return Color.fromAlpha(color, parseFloat(alpha));
  }

  const viewModel = {
    color: "Red",
    Colors: ["White", "Red", "Green", "Blue", "Yellow", "Gray"],
    alpha: 1.0,
    colorBlendMode: "HIGHLIGHT",
    colorBlendModes: ["HIGHLIGHT", "MIX", "REPLACE"],
    colorBlendAmount: 0.5,
    colorBlendAmountEnabled: false,
    silhouetteColor: "Blue",
    silhouetteColors: ["White", "Red", "Green", "Blue", "Yellow", "Gray"],
    silhouetteAlpha: 1.0,
    silhouetteSize: 4.0,
  };

  knockout.track(viewModel);

  return (
    <>
      <Viewer full infoBox="true" selectionIndicator="false" shadows="true" shouldAnimate="true">

      </Viewer>
    </>
  )
}
