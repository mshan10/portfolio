import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '../styles';
const { colors } = theme;

const ProjectsContainer = styled(Section)`
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
const ProjectTitle = styled.h4`
    margin-bottom: 5px;
`;
const Company = styled.span`
    color: ${colors.gold};
`;
const ProjectDetails = styled.h5`
    letter-spacing: 0.5px;
    color: ${colors.lightSlate};
    margin-bottom: 30px;
    svg {
        width: 15px;
    }
`;

const Projects = () => {
  const tempdata = [
    {
      "company": "BetterSports",
      "description": "",
      "url": "",
      "languages": "AngularJS | NodeJS (Express) | MongoDB",
      "range": "May 2018 - August 2019",
      "details": [
        'Allows the user to search through a directory of the Duncan Student Center',
        'Displays relevant information and images related to the search',
        'Supports user submitted events for the student center and email notifications on updates',
        'Managed directory information through a MongoDB database with Parse framework'
      ]
    },
    {
      "company": "Duncan",
      "description": "A directory app for the Duncan Student Center at Notre Dame, containing various business listings and services",
      "url": "",
      "languages": "AngularJS | NodeJS (Express) | MongoDB",
      "range": "May 2018 - August 2019",
      "details": [
        'Allows the user to search through a directory of the Duncan Student Center',
        'Displays relevant information and images related to the search',
        'Supports user submitted events for the student center and email notifications on updates',
        'Managed directory information through a MongoDB database with Parse framework'
      ]
    },
    {
      "company": "Porogram",
      "description": "An application that provides statistical insights for playes of the game League of Legends",
      "url": "porogram.me",
      "languages": "ReactJS | NodeJS (Express) | MongoDB",
      "range": "July 2018 - August 2018",
      "details": [
        'Displays hundreds of searchable player statistics for the game League of Legends',
        'Generated web and mobile friendly frontend app using ReactJS and Material Design',
        'Managed backend API calls to Riot Games using NodeJS',
        'Implemented infinite scrolling to dynamically display previous games',
        'Communicate with Mongo database and AWS to store user signup and login info'
      ]
    },
    {
      "company": "Sprout",
      "description": "Personalized event and schedule planner for college students designed to optimize planning and reduce stress",
      "url": "",
      "languages": "Angular | NodeJS",
      "range": "March 2019 - March 2019",
      "details": [
        'Designed back end system to connect with Notre Dame API to retrive university event data',
        'Recommends clubs and activities to join based on user selected interests',
        'Intuitive and user-friendly design with inspirational messages to support mental health',
        'Adds current class and club schedule to personalized calendar taken from student NDID',
        'Runner Up at Notre Dame Hackathon 2019'
      ]
    },
    {
      "company": "Terrorism",
      "description": "Data Science project to provide insights on how certain industries were impacted financially from significant terrorist attacks",
      "url": "",
      "languages": "Python",
      "range": "March 2019 - May 2019",
      "details": [
        'Parsed and cleaned data elements from a terrorism dataset and stock market dataset consisting of data ranging over 30 years',
        'Analyzed trends and developed predictions using regression and classification algorithms through numpy, pandas, and scikit-learn',
        'Compared observations of weekly trends within top industry ETFs to dates of active and significant terror activity using K-means clustering and linear regression'
      ]
    }
    
  ]
  const [activeTabId, setActiveTabId] = useState(0);
  const revealContainer = useRef(null);
  const data = tempdata
  // useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <ProjectsContainer id="projects" ref={revealContainer} >
      <TabsContainer>
        <Tabs role="tablist">
          {
            data.map(( node, i ) => {
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
              const { description, url, languages, range, details } = node;
              return (
                <TabContent
                  key={i}
                  isActive={activeTabId === i}
                  id={`project${i}`}
                  role="tabpanel"
                  tabIndex="0"
                  aria-labelledby={`project${i}`}
                  aria-hidden={activeTabId !== i}>
                  <ProjectTitle>
                    <span>{description}</span>
                  </ProjectTitle>
                  <Company>
                    {languages}
                  </Company>
                  <ProjectDetails>
                    <span>{range}</span>
                  </ProjectDetails>
                  <ul>
                    {details.map((detail) => <li>{detail}</li>)}
                  </ul>
                </TabContent>
              );
            })}
        </ContentContainer>
      </TabsContainer>
    </ProjectsContainer>
  );
};

Projects.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Projects;
