import { memo, useEffect, useMemo, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

function DetailUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [limit, setLimit] = useState(10);
  const [activePage, setActivePage] = useState(1);

  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage} onClick={() => handleMovePagination(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  const handleMovePagination = (number) => {
    setActivePage(number)
    setLimit(number * 10)
  }

  useEffect(() => {
    const getFirstDataUser = async () => {
      await fetch(`https://fakestoreapi.com/users?limit=${limit}`)
        .then(res=>res.json())
        .then(json => {
          const dataUser = user.length ? json.slice(limit - 10, limit) : json.slice(0, 10);
          setUser(dataUser)
        });
    } 

    getFirstDataUser();
  }, [limit]);

  const ShowDataUser = memo(({ id, email, username }) => {
    return (
      <tr>
        <td>{id}</td>
        <td>{email}</td>
        <td>{username}</td>
      </tr>
    )
  })

  const handleNavigateAddUser = () => {
    navigate('/user/add')
  }

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {user.length ? user?.map((item, index) => <ShowDataUser key={index} id={item?.id} email={item?.email} username={item?.username} />) : null}
        </tbody>
      </Table>
      <Row>
        <Col sm={9}>
          <Pagination>{items}</Pagination>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleNavigateAddUser}>Tambah User</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailUser;
