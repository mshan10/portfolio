import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '../styles';
const { colors } = theme;

const JobsContainer = styled(Section)`
    position: relative;
    max-width: 700px;
    padding-top: 20px;
    padding-bottom: 20px;
`;
const TabsContainer = styled.div`
    display: flex;
    align-items: flex-start;
    position: relative;
    ${media.thone`
        display: block;
    `};
`;
const Tabs = styled.ul`
    display: block;
    position: relative;
    width: max-content;
    list-style: none;
    z-index: 3;
    ${media.thone`
        padding: 0px;
        display: flex;
        overflow-x: scroll;
        margin-bottom: 30px;
        width: 100%;
    `};
    ${media.phablet`
        overflow-x: scroll;
    `};

    li {
        padding-left: 0px;
        &:first-of-type {
            ${media.thone`
                padding-left: 0px;
            `};
            ${media.phablet`
                margin-left: 0px;
            `};
        }
        &:last-of-type {
            ${media.thone`
                padding-right: 50px;
            `};
            ${media.phablet`
                padding-right: 25px;
            `};
        }
    }
`;
const Tab = styled.button`
    ${mixins.link};
    box-shadow: none;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: transparent;
    height: ${theme.tabHeight}px;
    padding: 0 20px 2px;
    transition: ${theme.transition};
    text-align: left;
    white-space: nowrap;

    color: ${props => (props.isActive ? colors.gold : colors.lightGrey)};
    ${media.tablet`padding: 0 15px 2px;`};
    ${media.thone`
    ${mixins.flexCenter};
        padding-left: 0px;
        text-align: center;
        border-left: 0;
        border-bottom: 2px solid ${colors.darkGrey};
        min-width: 120px;
    `};
    &:hover,
    &:focus {
        background-color: ${colors.lightNavy};
    }
`;
const Highlighter = styled.span`
    display: block;
    background: ${colors.gold};
    width: 2px;
    height: ${theme.tabHeight}px;
    border-radius: ${theme.borderRadius};
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: 0.1s;
    z-index: 10;
    transform: translateY(
        ${props => (props.activeTabId > 0 ? props.activeTabId * theme.tabHeight : 0)}px
    );
    ${media.thone`
        width: 100%;
        max-width: ${theme.tabWidth}px;
        height: 2px;
        top: auto;
        bottom: 0;
        transform: translateX(
            ${props => (props.activeTabId > 0 ? props.activeTabId * theme.tabWidth : 0)}px
        );
    `};
`;
const ContentContainer = styled.div`
    position: relative;
    padding-top: 12px;
    padding-left: 30px;
    flex-grow: 1;
    ${media.tablet`padding-left: 20px;`};
    ${media.thone`padding-left: 0;`};
`;
const TabContent = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    opacity: ${props => (props.isActive ? 1 : 0)};
    z-index: ${props => (props.isActive ? 2 : -1)};
    position: ${props => (props.isActive ? 'relative' : 'absolute')};
    visibility: ${props => (props.isActive ? 'visible' : 'hidden')};
    transition: ${theme.transition};
    transition-duration: ${props => (props.isActive ? '0.5s' : '0s')};
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        li {
            position: relative;
            padding-left: 30px;
            margin-bottom: 10px;
            &:before {
                content: '▹';
                position: absolute;
                left: 0;
                color: ${colors.gold};
            }
        }
    }
    a {
        ${mixins.inlineLink};
    }
`;
const JobTitle = styled.h4`
    margin-bottom: 5px;
`;
const Company = styled.span`
    color: ${colors.gold};
`;
const JobDetails = styled.h5`
    letter-spacing: 0.5px;
    color: ${colors.lightSlate};
    margin-bottom: 30px;
    svg {
        width: 15px;
    }
`;

const Jobs = () => {
  const data = [
    {
      "company": "Covur",
      "title": "Junior Web Developer Intern",
      "url": "covur.co",
      "range": "May 2018 - August 2019",
      "details": [
        'Led development of autonomous email and billing feature currently in use by 50 local business clients',
        'Designed custom image filter for streamlined email creation reaching 15,000 customers',
        'Implemented Mocha/Chai back-end unit tests and Cypress integration tests for over 30 new features',
        'Collaborated with coworkers on projects using agile design and scrum frameworks'
      ]
    },
    {
      "company": "Promazo",
      "title": "Software Engineer Intern",
      "url": "promazo.com",
      "range": "July 2018 - August 2018",
      "details": [
        'Constructed a monthly memo submission application using the MEAN stack utilized by 90 GE Ventures employees',
        'Designed an API that takes monthly input data and personal statistics to generate custom monthly report as pdf',
        'Communicated with the COO of GE Ventures in weekly standups to discuss progress and objectives',
        'Scaffoled front-end sections of the memo application to comply with company standards and designer mockups'
      ]
    },
    {
      "company": "Amaforge",
      "title": "Software Engineer Intern",
      "url": "amaforge.com",
      "range": "August 2018 - November 2018",
      "details": [
        'Developed user interface application to utilize custom NLP services that generates tailored grant, research, and faculty recommendations',
        'Setup university registration and login profiles currently in use by Notre Dame research departments and expanding to other universities',
        'Implemented infinite scrolling feature for list of grants and research opportunities',
        'Constructed robust templates to nicely show NLP populated search results on both web and mobile devices'
      ]
    }
  ]
  const [activeTabId, setActiveTabId] = useState(0);
  const revealContainer = useRef(null);
  // useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);
  console.log(data)

  return (
    <JobsContainer id="jobs" ref={revealContainer} >
      <TabsContainer>
        <Tabs role="tablist">
          {
            data.map(( node, i ) => {
              console.log("node ", node)
              const { company } = node;
              return (
                <li key={i}>
                  <Tab
                    isActive={activeTabId === i}
                    onClick={() => setActiveTabId(i)}
                    role="tab"
                    aria-selected={activeTabId === i ? 'true' : 'false'}
                    aria-controls={`tab${i}`}
                    id={`tab${i}`}
                    tabIndex={activeTabId === i ? '0' : '-1'}>
                    <span>{company}</span>
                  </Tab>
                </li>
              );
            })}
          <Highlighter activeTabId={activeTabId} />
        </Tabs>
        <ContentContainer>
          {data &&
            data.map(( node , i) => {
              // const { frontmatter, html } = node;
              const { title, url, company, range, details } = node;
              return (
                <TabContent
                  key={i}
                  isActive={activeTabId === i}
                  id={`job${i}`}
                  role="tabpanel"
                  tabIndex="0"
                  aria-labelledby={`job${i}`}
                  aria-hidden={activeTabId !== i}>
                  <JobTitle>
                    <span>{title}</span>
                    <Company>
                      <span>&nbsp;@&nbsp;</span>
                      <a href={url} target="_blank" rel="nofollow noopener noreferrer">
                        {company}
                      </a>
                    </Company>
                  </JobTitle>
                  <JobDetails>
                    <span>{range}</span>
                  </JobDetails>
                  <ul>
                    {details.map((detail) => <li>{detail}</li>)}
                  </ul>
                </TabContent>
              );
            })}
        </ContentContainer>
      </TabsContainer>
    </JobsContainer>
  );
};

Jobs.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Jobs;
