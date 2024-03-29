import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'
import moment from 'moment'

const GET_RECENT_REVIEWS_QUERY = gql`
  {
    reviews(options: { limit: 10, sort: { date: DESC } }) {
      user {
        name
      }
      business {
        name
      }
      date
      text
      stars
    }
  }
`

export default function RecentReviews() {
  const { loading, error, data } = useQuery(GET_RECENT_REVIEWS_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Personalities</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Business Name</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Review Text</TableCell>
            <TableCell align="right">Review Stars</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.reviews.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{moment(row.date).format('MMMM Do YYYY')}</TableCell>
              <TableCell>{row.business.name}</TableCell>
              <TableCell>{row.user.name}</TableCell>
              <TableCell>{row.text}</TableCell>
              <TableCell align="right">{row.stars}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
