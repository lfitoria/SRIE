import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import { ChartMetrics, DisplayTypes } from './types/ChartTypes';
import ChartControls from './controls/ChartControls';
import { withTranslation } from '../../i18n';
import { charDataFormatHelper } from './helpers/ChartDataHelper';
import { defaultBarSize } from './Constants';
import { maleBarColor, femaleBarColor } from '../../theme/colors';

const Content = styled.div`
  width: 100%;
  background-color: #FFFFFF;
`;

const SexChart = ({ data, t, chartType }) => {
  const [latestData, setLatestData] = useState(charDataFormatHelper(data.visualizations.sex.latest));
  const [historicalData, setHistoricalData] = useState(charDataFormatHelper(data.visualizations.sex.historical));
  const [chartMetrics, setChartMetrics] = useState(ChartMetrics.LAST_YEAR);
  const datasource = chartMetrics === ChartMetrics.LAST_YEAR ? latestData : historicalData;

  const columns = [
    {
      name: t('year'),
      selector: 'groupBy',
      sortable: true,
    },
    {
      name: t('M'),
      selector: 'M',
      sortable: true,
    },
    {
      name: t('F'),
      selector: 'F',
      sortable: true,
    },
  ];

  const showContent = () => {
    if (chartType === DisplayTypes.CHART) {
      return (
        <BarChart
          data={datasource}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
          isAnimationActive={false}
        >
          <CartesianGrid strokeDasharray="0 0" />
          <XAxis dataKey="groupBy" />
          <YAxis unit="%" />
          <Tooltip />
          <Legend />
          <Bar dataKey="M" fill={maleBarColor} name={t('M')} unit="%" barSize={defaultBarSize} />
          <Bar dataKey="F" fill={femaleBarColor} name={t('F')} unit="%" barSize={defaultBarSize} />
        </BarChart>
      );
    }
    return (
      <DataTable
        title="Total"
        columns={columns}
        data={datasource}
        striped
      />
    );
  };

  return (
    <Content>
      <ChartControls setChartMetrics={setChartMetrics} chartMetrics={chartMetrics} />
      <ResponsiveContainer width="100%" height={400}>
        {showContent()}
      </ResponsiveContainer>
    </Content>
  );
};

SexChart.getInitialProps = ({ t, data, chartType }) => (
  {
    t,
    data,
    chartType,
    namespacesRequired: ['charts'],
  }
);

export default withTranslation('charts')(SexChart);