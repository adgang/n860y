import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'
import { Link } from 'react-router-dom'
// import moment from 'moment'

const GET_PEOPLE_QUERY = gql`
  {
    people(options: { limit: 10, sort: { name: ASC } }) {
      name
    }
  }
`

export default function People() {
  const { loading, error, data } = useQuery(GET_PEOPLE_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Personalities</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.people.map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                <Link to={'/people/' + row.name}> {row.name} </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
