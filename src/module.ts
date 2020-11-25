import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addTextInput({
      path: 'svg',
      name: 'SVG graphic',
      description: 'The SVG graphic definition to use',
      defaultValue:
        'M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z',
    })
    .addTextInput({
      path: 'viewbox',
      name: 'View Box',
      description: 'The view box size',
      defaultValue: '0 0 512 512',
    })
    .addColorPicker({
      path: 'lowcolor',
      name: 'Lower Color',
      description: 'The color used when the data is below the threshold',
      defaultValue: 'red',
    })
    .addColorPicker({
      path: 'middlecolor',
      name: 'Middle Color',
      description: 'The color used when the data is between the threshold',
      defaultValue: 'orange',
    })
    .addColorPicker({
      path: 'highcolor',
      name: 'High Color',
      description: 'The color used when the data is above the threshold',
      defaultValue: 'green',
    })
    .addNumberInput({
      path: 'thresholdlow',
      name: 'Threshold Minimum',
      description: 'Value below that will be displayed with the lower color',
      defaultValue: 0,
    })
    .addNumberInput({
      path: 'thresholdhigh',
      name: 'Threshold Maximum',
      description: 'Value above that will be displayed with the high color',
      defaultValue: 100,
    })
    .addTextInput({
      path: 'description',
      name: 'Description',
      description: 'Description of the panel',
      defaultValue: 'My beautiful panel',
    })
    .addTextInput({
      path: 'addLinks',
      name: 'Add Links',
      description: 'Use $series_name to resolve series name in links',
      defaultValue: '',
    })
    .addBooleanSwitch({
      path: 'openInNextTab',
      name: '',
      description: 'Open in next tab',
      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'showSeriesValue',
      name: 'Show series value',
      defaultValue: false,
    })
    .addRadio({
      path: 'seriesCountSize',
      defaultValue: 'sm',
      name: 'Series counter size',
      settings: {
        options: [
          {
            value: 'sm',
            label: 'Small',
          },
          {
            value: 'md',
            label: 'Medium',
          },
          {
            value: 'lg',
            label: 'Large',
          },
        ],
      },
      showIf: config => config.showSeriesValue,
    })
    .addColorPicker({
      path: 'valuecolor',
      name: 'Value Color',
      description: 'The color used to display the data',
      defaultValue: 'grey',
      showIf: config => config.showSeriesValue,
    })
    .addTextInput({
      path: 'units',
      name: 'Units',
      description: 'The optional unit label',
      defaultValue: ' MB',
    });
});
