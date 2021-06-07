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
        statement {
          content
        }
      }
      meetings {
        name
        during
        at {
          name
        }
        statement {
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
    console.log(data)

    let list = []
    list = list.concat(
      meetings.flatMap((m) =>
        m.statement
          ? m.statement.map((s) => {
              return { statement: s.content, meeting: m }
            })
          : []
      )
    )
    list = list.concat(
      books.flatMap((b) =>
        b.statement
          ? b.statement.map((s) => {
              return { statement: s.content, book: b }
            })
          : []
      )
    )
    return list
  }

  return (
    <React.Fragment>
      <Title>{name}</Title>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="Tabs">
          <Tab label="Books" {...a11yProps(0)} />
          <Tab label="Meetings" {...a11yProps(1)} />
          <Tab label="Statements" {...a11yProps(2)} />
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
      <div hidden={1 !== value} key={1}>
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
      <div key={2} hidden={2 !== value}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Statement</TableCell>
              <TableCell>Occasion</TableCell>
              <TableCell>During</TableCell>
              <TableCell>Place</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getStatements().map((row) => (
              <TableRow key={row.statement}>
                <TableCell>{row.statement}</TableCell>
                {row.meeting ? (
                  <>
                    <TableCell>{row.meeting.name}</TableCell>
                    <TableCell>{row.meeting.during}</TableCell>
                    <TableCell>{row.meeting.at.name}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{row.book.title}</TableCell>
                    <TableCell>{row.book.year}</TableCell>
                    <TableCell>{row.book.publisher}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  )
}
