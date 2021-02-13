import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
//import { getDataSourceSrv } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();
  //  options.errorText="TOTO";
  var lastvals: number = data.series
    .map(series => series.fields.find(field => field.type === 'number'))
    .map(field => field?.values.get(field.values.length - 1))[0];

  const svgcolor =
    lastvals <= options.thresholdlow
      ? options.lowcolor
      : lastvals > options.thresholdhigh
      ? options.highcolor
      : options.middlecolor;
  const errorText =
    data.series.length < 1 ? 'No time series defined' : data.series[0].fields.length < 2 ? 'No values defined' : '';
  /*if (options.addLinks) {
    const dataSourceSrv: any = getDataSourceSrv();
    options.addLinks = options.addLinks.replace('$series_name', '' + lastvals);
    options.addLinks = dataSourceSrv.templateSrv.replace(options.addLinks, '', '', false).replace(/[{}]/g, '');
  }*/

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div className={styles.errorMessage}>{errorText}</div>
      {options.addLinks && options.addLinks.length > 0 ? (
        <a href={options.addLinks} target={options.openInNextTab ? '_blank' : '_self'}>
          <svg viewBox={options.viewbox} className={styles.svg} width={width} height={height}>
            <g stroke={svgcolor} fill={svgcolor}>
              <path d={options.svg}></path>
            </g>
          </svg>
        </a>
      ) : (
        <svg viewBox={options.viewbox} className={styles.svg} width={width} height={height}>
          <g stroke={svgcolor} fill={svgcolor}>
            <path d={options.svg}></path>
          </g>
        </svg>
      )}

      <div className={styles.valueBox}>
        {options.showSeriesValue && options.addLinks && options.addLinks.length > 0 && (
          <div
            className={css`
              font-size: ${theme.typography.size[options.seriesCountSize]};
              color: ${options.valuecolor};
            `}
          >
            <a href={options.addLinks} target={options.openInNextTab ? '_blank' : '_self'}>
              {lastvals}
              {options.units}
            </a>
          </div>
        )}
        {options.showSeriesValue && options.addLinks.length === 0 && (
          <div
            className={css`
              font-size: ${theme.typography.size[options.seriesCountSize]};
              color: ${options.valuecolor};
            `}
          >
            {lastvals}
            {options.units}
          </div>
        )}
      </div>
      <div className={styles.textBox}>
        <div>{options.description}</div>
      </div>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
    valueBox: css`
      position: absolute;
      top: 45%;
      left: 0;
      right: 0;
      text-align: center;
      padding: 0px;
    `,
    errorMessage: css`
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px;
      color: red;
    `,
  };
});
