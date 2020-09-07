import { Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import IndicatorListItem from '../../../components/indicators/IndicatorListItem';
import Title from '../../../components/layout/Title';
import PecIcon from '../../../public/img/home/icon_pec_indicadores.svg';

import { withTranslation } from '../../../i18n';
import FilterResult from '../../../components/indicadors/FilterResult';
import CountryHeader from '../../../components/countries/CountryHeader';

import FetchUtils from '../../../utils/Fetch.utils';
import {
  gray2,
} from '../../../styles/colors';

const IconImg = styled.img`
  width: 20px;
  height: 20px;
`;

const IndicatorTitle = styled.div`
 &.col-lg-8 {
      flex: 0 0 65.666667%;
      max-width: 65.666667%;
  }
`;
const LabelFilter = styled.label`
  font-family: Roboto;
  font-size: 1em;
  font-weight: bolder;
  color: ${gray2};
`;

const filterPec = (pec, indicator, goals) => {
  if (pec !== 0) {
    return indicator.pec_goals.some((pecGoal) => pecGoal.code === goals.find((goal) => goal.id === pec)?.code);
  }
  return true;
};

const filterTopic = (topic, indicator, topics) => {
  if (topic !== 0) {
    return indicator.topics.some((someTopic) => someTopic.code === topics.find((filteredTopic) => filteredTopic.id === topic)?.code);
  }
  return true;
};

const filterEducationLevel = (educationLevel, indicator, educationLevels) => {
  if (educationLevel !== 0) {
    return indicator.education_levels.some((someLevel) => someLevel.translation_key === educationLevels.find((level) => level.id === educationLevel)?.code);
  }
  return true;
};

const IndicatorListPage = ({
  t, countries, country, pecGoals, topics, educationLevels, indicators,
}) => {
  const [pec, setPec] = useState(0);
  const [topic, setTopic] = useState(0);
  const [educationLevel, setEducationLevel] = useState(0);

  const navigation = [
    { key: 'navigation.pages.indicators' },
  ];

  const showFilter = () => {
    if (topic !== 0 || educationLevel !== 0 || pec !== 0) {
      return (
        <Row>
          <FilterResult
            pec={pecGoals.find((e) => e.id === pec)?.code || t('common:goal.all')}
            level={t(`topics.${topics.find((e) => e.id === topic)?.code || t('all')}`)}
            topic={t(`education-levels:${educationLevels.find((e) => e.id === educationLevel)?.code || t('common:goal.all')}`)}
          />
        </Row>
      );
    }
    return (
      <>
      </>
    );
  };

  const showIndicatorList = () => {
    if (topic !== 0 || educationLevel !== 0 || pec !== 0) {
      const filteredIndicators = indicators.filter((indicator) => filterPec(pec, indicator, pecGoals)
        && filterTopic(topic, indicator, topics)
        && filterEducationLevel(educationLevel, indicator, educationLevels));
      return (filteredIndicators.map((indicator) => (
        <IndicatorListItem indicator={indicator} countryName={country.short_name} />
      )));
    }
    return (indicators.map((indicator) => (
      <IndicatorListItem indicator={indicator} countryName={country.short_name} />
    )));
  };

  return (
    <>
      <CountryHeader countries={countries} country={country} navigation={navigation} active="indicators" />
      <Container>
        <Row className="mt-5 mb-5">
          <div className="col-lg-12 pr-0 text-center">
            <Title color="blueTitleIndicator" type="title">
              {t('common:educationalIndicators')}
            </Title>
          </div>
        </Row>
        <Row>
          <div className="col-lg-12 pr-0 text-left">
            <Title color="bordes" type="subtitle">
              {`${t('common:filter.filterIndicatorsBy')}:`}
            </Title>
            <form>
              <Row>
                <div className="form-group col-lg-4">
                  <LabelFilter htmlFor="form-indicadors-pec">{t('common:filter.goalMeta')}</LabelFilter>
                  <select
                    className="form-control"
                    id="form-indicadors-pec"
                    onChange={(e) => setPec(parseInt(e.target.value, 10))}
                  >
                    <option key="goal-default" value={0}>{t('common:goal.all')}</option>
                    {pecGoals.map((goal) => (
                      <option key={`goal-${goal.id}`} value={goal.id}>{goal.code}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-lg-4">
                  <LabelFilter htmlFor="topic-select">{t('common:filter.topic')}</LabelFilter>
                  <select id="topic-select" className="form-control" onChange={(e) => setTopic(parseInt(e.target.value, 10))}>
                    <option key="topic-default" value={0}>{t('topics.all')}</option>
                    {topics.map((topicItem) => (
                      <option key={`topic-${topicItem.id}`} value={topicItem.id}>{t(`topics.${topicItem.code}`)}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-lg-4">
                  <LabelFilter htmlFor="form-indicadors-level">{t('common:filter.level')}</LabelFilter>
                  <select
                    className="form-control"
                    id="form-indicadors-level"
                    onChange={(e) => setEducationLevel(parseInt(e.target.value, 10))}
                  >
                    <option key="education-level-default" value={0}>{t('education-levels:all')}</option>
                    {educationLevels.map((level) => (
                      <option key={`education-level-${level.id}`} value={level.id}>{t(`education-levels:${level.code}`)}</option>
                    ))}
                  </select>
                </div>
              </Row>
            </form>
          </div>
        </Row>
      </Container>
      <Container fluid>
        <Row className="mt-5 mb-5 bg-light pt-2 pb-0">
          <Container>
            {showFilter()}
          </Container>
        </Row>
      </Container>
      <Container>
        <Row className="mt-3 mb-3">
          <IndicatorTitle className="col-lg-8 mb-3 pr-0">
            <Title color="negro" type="caption">
              {t('common:educationalIndicators')}
            </Title>
          </IndicatorTitle>
          <div className="col-lg-2 mb-3 p-0">
            <Row className="">
              <div className="col-lg-2 m-0 p-0 d-flex align-items-center justify-content-center">
                <IconImg src={PecIcon} />
              </div>
              <div className="col-lg-8 m-0 p-0">
                <Title color="negro" type="caption">
                  {t('common:pec')}
                </Title>
              </div>
            </Row>
          </div>
          <div className="col-lg-2 mb-3">
            <Row>
              <div className="col-lg-2 m-0 p-0 d-flex align-items-center justify-content-center">
                <IconImg src={PecIcon} />
              </div>
              <div className="col-lg-8 m-0 p-0">
                <Title color="negro" type="caption">
                  {t('common:ods4')}
                </Title>
              </div>
            </Row>
          </div>
          {showIndicatorList()}
        </Row>
      </Container>
    </>
  );
};

IndicatorListPage.getInitialProps = async ({ query }) => {
  const [countries, pecGoals, topics, educationLevels, indicators] = await FetchUtils.multipleFetch([
    `${process.env.API_URL}/api/countries`,
    `${process.env.API_URL}/api/pec-goals`,
    `${process.env.API_URL}/api/topics`,
    `${process.env.API_URL}/api/education-levels`,
    `${process.env.API_URL}/api/indicators`,
  ]);

  const country = _.find(countries, (c) => c.short_name === query.id);

  return {
    namespacesRequired: ['topics', 'education-levels'],
    countries,
    country,
    pecGoals,
    topics,
    educationLevels,
    indicators,
  };
};

export default withTranslation('topics', 'education-levels', 'common')(IndicatorListPage);
