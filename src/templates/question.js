import React, { useState } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import QuestionList from '../components/trending-questions'
import TrendingTags from '../components/trending-tags'
import OptionsPie from '../components/options-pie'
import {
  Divider,
  Tag,
  Button,
  ButtonGroup,
  Alignment,
  Tab,
  Tabs,
  Intent
} from '@blueprintjs/core'
import { Column, Table, Cell } from '@blueprintjs/table'
import { getMockNames, getMockNo, getMockYes } from '../data/mock-table.js'

let intentCount = -1

const getRandomIntent = () => {
  if(intentCount > 4 || intentCount < 0)
    intentCount = 0

  intentCount++
  
  switch(intentCount){
    case 0:
      return Intent.NONE
    case 1:
      return Intent.PRIMARY
    case 2:
      return Intent.SUCCESS
    case 3:
      return Intent.WARNING
    case 4:
      return Intent.DANGER
  }
}

const RenderTable = (props) => (
  <Table style={{ marginTop: '40px' }} numRows={5}>
    <Column name='Groups' cellRenderer={getMockNames} />
    <Column name='Yes' cellRenderer={getMockYes} />
    <Column name='No' cellRenderer={getMockNo} />
  </Table>
)

const RenderConstruction = (props) => (
  <center><div style={{marginTop:'50px', marginBottom:'50px'}}>Under construction</div></center>
)

const Question = ({ pageContext }) => {
  const [currentTab, setCurrentTab] = useState('ng')
  const { tags, title } = pageContext

  return (
    <Layout>
      <SEO title={title} />
      <h3>{title}</h3>
      <Divider />
      {tags.map((tag, index) => (
        <Tag
          key={`tag-${index}`}
          style={{ marginRight: '10px', marginTop: '5px', marginBottom: '5px' }}
          large={true}
          intent={getRandomIntent()}
        >
          {tag}
        </Tag>
      ))}
      <Divider />

      <center>
        <ButtonGroup
          vertical={true}
          alignText={Alignment.CENTER}
          style={{
            minWidth: 120,
            marginTop: '50px',
            marginBottom: '50px',
          }}
        >
          {pageContext.options.map((option, index) => (
            <Button key={`option-${index}`} large={true} text={option} />
          ))}
        </ButtonGroup>
      </center>
      <Divider />
      <h3>Results</h3>
      <Tabs
        id='TabsExample'
        large={true}
        selectedTabId={currentTab}
        onChange={setCurrentTab}
      >
        <Tab id='ng' title='Table' panel={<RenderTable />} />
        <Tab id='mb' title='Bar Chart' panel={<RenderConstruction />} />
        <Tab
          id='rx'
          title='Line Chart'
          panel={<RenderConstruction />}
        />
        <Tab id='rv' title='Pie Chart' panel={<OptionsPie options={pageContext.options} />} />
      </Tabs>

      <Divider />
      <TrendingTags />
      <Divider />
      <QuestionList />
    </Layout>
  )
}
export default Question
