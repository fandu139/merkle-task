import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

function ModalEditUser({ idUser, showModalEdit, handleShowModalEdit }) {
  const [isLoading, setIsLoading] = useState(false);

  const [dataUser, setDataUser] = useState({
    username: '',
    email: '',
    password: '',
    name: {
      firstname: '',
      lastname: '',
    },
    phone: '',
    address: {
      street: '',
      city: '',
      number: '',
      zipcode: '',
      geolocation: {
        lat: '',
        long: '',
      }
    },
  });

  useEffect(() => {
    fetch(`https://fakestoreapi.com/users/${idUser}`)
      .then(res => res.json())
      .then(json => {
        setIsLoading(false);
        setDataUser(json);
      })
  }, [])

  const handleClose = () => handleShowModalEdit(false);

  const submitDataUser = async () => {
    const manipulateData = {
      ...dataUser,
    }

    delete manipulateData.id;
    delete manipulateData.__v;
    
    setIsLoading(true);
    await fetch(`https://fakestoreapi.com/users/${idUser}`, {
      method:"PUT",
      body:JSON.stringify(manipulateData)
    })
    .then(res=>res.json())
    .then(json=> {
      setIsLoading(false);
      alert('Data berhasil di edit');
      handleClose();
    });
  }

  const SpinnerComponent = () => {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  const userInputDataComponent = () => {
    return (
      <>
        <Row>
          <Col sm={4}>Username</Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.username">
              <Form.Control
                type="text"
                placeholder="username anda"
                value={dataUser?.username}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  username: e.target.value,
                })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>Email</Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.email">
              <Form.Control
                type="email"
                placeholder="email anda"
                value={dataUser?.email}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  email: e.target.value,
                })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>Password</Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.password">
              <Form.Control
                type="password"
                placeholder="password anda"
                value={dataUser?.password}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  password: e.target.value,
                })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>Nama Depan</Col>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="exampleForm.firstName">
              <Form.Control
                type="text"
                placeholder="nama depan anda"
                value={dataUser?.name?.firstname}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  name: {
                    ...dataUser?.name,
                    firstname: e.target.value
                  },
                })}
              />
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="exampleForm.lastName">
              <Form.Control
                type="text"
                placeholder="nama belakang anda"
                value={dataUser?.name?.lastname}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  name: {
                    ...dataUser?.name,
                    lastname: e.target.value
                  },
                })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>Nomor Telp</Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.phone">
              <Form.Control
                type="text"
                placeholder="nomor telepon anda"
                value={dataUser?.phone}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  phone: e.target.value,
                })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>Alamat</Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.street">
              <Form.Control type="text" placeholder="Jalan" value={dataUser?.address?.street}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  address: {
                    ...dataUser?.address,
                    street: e.target.value
                  },
                })}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.city">
              <Form.Control type="text" placeholder="Kota" value={dataUser?.address?.city}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  address: {
                    ...dataUser?.address,
                    city: e.target.value
                  },
                })}/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.number">
              <Form.Control type="text" placeholder="Nomor rumah" value={dataUser?.address?.number}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  address: {
                    ...dataUser?.address,
                    number: e.target.value
                  },
                })}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.zipcode">
              <Form.Control type="text" placeholder="Kode Pos" value={dataUser?.address?.zipcode}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  address: {
                    ...dataUser?.address,
                    zipcode: e.target.value
                  },
                })}/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.lat">
              <Form.Control type="text" placeholder="Latitude" value={dataUser?.address?.geolocation?.lat}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  address: {
                    ...dataUser?.address,
                    geolocation: {
                      ...dataUser?.address?.geolocation,
                      lat: e.target.value
                    }
                  },
                })}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.long">
              <Form.Control type="text" placeholder="Longitude" value={dataUser?.address?.geolocation?.long}
                onChange={(e) => setDataUser({
                  ...dataUser,
                  address: {
                    ...dataUser?.address,
                    geolocation: {
                      ...dataUser?.address?.geolocation,
                      long: e.target.value
                    }
                  },
                })}/>
            </Form.Group>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <Modal
        size="lg"
        show={showModalEdit}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {isLoading ? <SpinnerComponent /> : userInputDataComponent()}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitDataUser}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;