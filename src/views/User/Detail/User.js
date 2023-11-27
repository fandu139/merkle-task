import useForm from '../../../hook/useFormLogin';
import validate from '../../../utils/validateForm';
import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DetailUser() {
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Pagination>{items}</Pagination>
      </Row>
    </Container>
  );
}

export default DetailUser;
