import { memo, useEffect, useMemo, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import ModalDetailUser from './component/Modal/DetailUser';
import ModalAddUser from './component/Modal/AddUser';
import ModalEditUser from './component/Modal/EditUser';

function DetailUser() {
  const [user, setUser] = useState([]);
  const [limit, setLimit] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [showDetailUser, setShowDetailUser] = useState();
  const [showEditUser, setShowEditUser] = useState();
  
  // show modal
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalAddUser, setShowModalAddUser] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);

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

  // modal detail user
  const handleShowModalDetail = () => {
    setShowModalDetail(!showModalDetail);
  }

  const handleShowDetailByID = (id) => {
    setShowDetailUser(id);
    handleShowModalDetail();
  }

  // modal add user
  const handleShowModalAddUser = () => {
    setShowModalAddUser(!showModalAddUser);
  }

  // modal edit user
  const handleShowModalEdit = () => {
    setShowModalEditUser(!showModalEditUser);
  }

  const handleShowEditByID = (id) => {
    setShowEditUser(id);
    handleShowModalEdit();
  }

  const ShowDataUser = memo(({ id, email, username }) => {
    return (
      <tr>
        <td>{id}</td>
        <td>{email}</td>
        <td>{username}</td>
        <td>
          <Container>
            <Row>
              <Col><Button variant="success" onClick={() => handleShowEditByID(id)}>Edit</Button></Col>
              <Col><Button variant="warning" onClick={() => handleShowDetailByID(id)}>Detail</Button></Col>
            </Row>
          </Container>
        </td>
      </tr>
    )
  })

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Action</th>
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
          <Button variant="primary" onClick={handleShowModalAddUser}>Tambah User</Button>
        </Col>
      </Row>
      {showModalDetail && <ModalDetailUser idUser={showDetailUser} showModalDetail={showModalDetail} handleShowModalDetail={handleShowModalDetail}/>}
      {showModalAddUser && <ModalAddUser showModalAddUser={showModalAddUser} handleShowModalAddUser={handleShowModalAddUser}/>}
      {showModalEditUser && <ModalEditUser idUser={showEditUser} showModalEdit={showModalEditUser} handleShowModalEdit={handleShowModalEdit}/>}
    </Container>
  );
}

export default DetailUser;
