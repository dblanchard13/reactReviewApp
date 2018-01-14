
import React from 'react'
import { Row, Col } from '../Grid'
import { List, ListItem } from '../List'
import DeleteBtn from '../DeleteBtn'

const ErrorDisplay = props => (
  <Row>
    <Col size='md-4'></Col>

    <Col size='md-4'>
      {
        props.errors && props.errors.length ? (
          <List>
          {
            props.errors.map((error, idx) => (
              <ListItem key={ idx } className='alert alert-danger' style={{ marginBottom: 0 }}>
                <strong>
                  { error.message }
                </strong>
                <DeleteBtn onClick={ () => props.dismiss(idx) } />
              </ListItem>
            ))
          }
          </List>
        ) : null
      }
    </Col>
  </Row>
)

export default ErrorDisplay
