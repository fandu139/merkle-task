import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

function ModalDetailUser({ idUser, showModalDetail, handleShowModalDetail }) {
  const [isLoading, setIsLoading] = useState(true)
  const [dataUser, setDataUser] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    username: '',
    address: {
      street: '',
    },
  });

  const handleClose = () => handleShowModalDetail(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/users/${idUser}`)
      .then(res => res.json())
      .then(json => {
        setIsLoading(false);
        setDataUser(json);
      })
  }, [])

  const SpinnerComponent = () => {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  const UserDataComponent = () => {
    return (
      <>
        <Row>
          <Col>Nama</Col>
          <Col>{`${dataUser?.name?.firstname} ${dataUser?.name?.lastname}`}</Col>
        </Row>
        <Row>
          <Col>Nomor Telp</Col>
          <Col>{dataUser?.phone}</Col>
        </Row>
        <Row>
          <Col>Email</Col>
          <Col>{dataUser?.email}</Col>
        </Row>
        <Row>
          <Col>Username</Col>
          <Col>{dataUser?.username}</Col>
        </Row>
        <Row>
          <Col>Alamat</Col>
          <Col>{dataUser?.address?.street}</Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <Modal
        show={showModalDetail}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {isLoading ? <SpinnerComponent /> : <UserDataComponent />}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDetailUser;