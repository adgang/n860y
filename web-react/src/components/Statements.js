import React, { useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'
// import moment from 'moment'

import { AppBar, Tab, Tabs } from '@material-ui/core'

const GET_PROFILE_QUERY = gql`
  query getProfile($name: String!) {
    people(where: { name: $name }) {
      name
      books {
        title
        year
        publisher
        statements {
          content
        }
      }
      meetings {
        name
        during
        at {
          name
        }
        statements {
          content
        }
      }
    }
  }
`

export default function PersonDetails() {
  const { name } = useParams()
  const { loading, error, data } = useQuery(GET_PROFILE_QUERY, {
    variables: { name },
  })
  const [value, setValue] = useState(0)

  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getStatements = () => {
    const meetings = data.people[0].meetings
    const books = data.people[0].books
    const list = []
    list.concat(meetings.map(m => m.statements.map(s => { return { statement: s.content, meeting: m } })))
    list.concat(books.map(b => b.statements.map(s => { return { statement: s.content, book: b } })))
    console.log(list)
    return list;
  }

  const statements = getStatements();

  return (
    <React.Fragment>
      <Title>{name}</Title>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="Tabs">
          <Tab label="Books" {...a11yProps(0)} key={0} />
          <Tab label="Meetings" {...a11yProps(1)} key={1} />
          <Tab label="Statements" {...a11yProps(2)} key={2} />
        </Tabs>
      </AppBar>
      <div key={0} hidden={value !== 0}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell key="Book">Book</TableCell>
              <TableCell key="Year">Year</TableCell>
              <TableCell>Publisher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.people[0].books.map((row) => (
              <TableRow key={row.title}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.publisher}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div key={1} hidden={1 !== value} key={1}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Occasion</TableCell>
              <TableCell>During</TableCell>
              <TableCell>Place</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.people[0].meetings.map((row) => (
              <TableRow key={row.title}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.during}</TableCell>
                <TableCell>{row.at.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div key={2} hidden={2 !== value} >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Occasion</TableCell>
              <TableCell>During</TableCell>
              <TableCell>Place</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statements.map((row) => (
              <TableRow key={row.content}>
                <TableCell>{row.content}</TableCell>
                <TableCell>{row.during}</TableCell>
                <TableCell>{row.at.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  )
}
