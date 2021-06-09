import React, { useContext, useRef, useState } from 'react'
import Title from './Title'
import { NoteContext } from '../App'
import {
  Button,
  CardActions,
  CardContent,
  Divider,
  TextareaAutosize,
  // TextField,
  Typography,
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { Tab, Tabs } from '@material-ui/core'
import { PDFViewer } from '@react-pdf/renderer'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
})
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

export default function Notes() {
  const notes = useContext(NoteContext)
  const additions = []
  for (let i = 0; i < notes.length + 1; i++) {
    additions.push(useRef(''))
  }
  const [value, setValue] = useState(0)
  const [resetState, setResetState] = useState({})
  console.log(resetState)

  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
    setResetState({})
  }

  function getReferences() {
    return notes.map((n, index) => {
      return (
        <Text key={'reference' + index}>
          [{index + 1}]
          {' ' +
            (n.meeting
              ? [n.meeting.name, new Date(n.meeting.during).getFullYear()].join(
                  ', '
                )
              : [n.book.title, n.book.year].join(', '))}
        </Text>
      )
    })
  }

  function getBody() {
    const textList = []
    textList.push(additions[0].current.value)
    for (var i = 0; i < notes.length; i++) {
      textList.push(notes[i].statement)
      textList.push(additions[i + 1].current.value)
    }
    return textList.map((t, index) => <Text key={'para-' + index}>{t}</Text>)
  }

  function getDocument() {
    return notes.length > 0 ? (
      <div hidden={value !== 1}>
        <PDFViewer>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>{getBody()}</View>
              <View style={styles.section}>
                <Text style={styles.subtitle}>References:</Text>
                {getReferences()}
              </View>
            </Page>
          </Document>
        </PDFViewer>
        <br />
        <p>Right Click And Save As to Download PDF</p>
      </div>
    ) : (
      <div hidden={value != 1}>
        <PDFViewer>
          <Document hidden={value !== 1}>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Empty</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Title>Notes</Title>
      <Tabs value={value} onChange={handleChange} aria-label="Tabs">
        <Tab label="Edit" {...a11yProps(0)} />
        <Tab label="Preview" {...a11yProps(1)} />
      </Tabs>
      <div key={0} hidden={value !== 0}>
        <TextareaAutosize
          style={{ width: '80%' }}
          ref={additions[0]}
        ></TextareaAutosize>
        {notes.map((n, i) => {
          return (
            <>
              <Card style={{ width: '80%' }}>
                <CardContent>
                  <Typography variant="body2" component="p">
                    {n.statement}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Remove</Button>
                </CardActions>
              </Card>
              <TextareaAutosize
                style={{ width: '80%' }}
                ref={additions[i + 1]}
              ></TextareaAutosize>
            </>
          )
        })}
        <Divider></Divider>
      </div>
      {getDocument()}
    </React.Fragment>
  )
}
