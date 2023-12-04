import EditForm from "./EditForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faFloppyDisk,
  faTrash,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import imgStandard from "../assets/images/standard.jpg";
import imgSuperior from "../assets/images/superior.jpeg";
import imgLuxury from "../assets/images/luxury.jpeg";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [kamar, setKamar] = useState({
    nama: "",
    kategori: "",
    harga: "",
    deskripsi: "",
  });

  const [daftarKamar, setDaftarKamar] = useState([]);

  const [jmlData, setJmlData] = useState(0);

  const [indexUpdate, setIndexUpdate] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setKamar({ ...kamar, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      kamar.nama === "" ||
      kamar.kategori === "" ||
      kamar.harga === "" ||
      kamar.deskripsi === ""
    ) {
      toast.error("Semua Form harus diisi!");
      return;
    } else {
      const newKamar = kamar;

      const existingKamar = JSON.parse(localStorage.getItem("kamar")) || [];
      const updatedKamarList = [...existingKamar, newKamar];

      localStorage.setItem("kamar", JSON.stringify(updatedKamarList));
      setDaftarKamar(updatedKamarList);

      toast.success(`Berhasil Tambah Data Kamar ${kamar.nama}`, {
        render: ({ onClose }) => (
          <div>
            <div>Data kamar berhasil ditambah:</div>
            <div>Nama Kamar: {kamar.nama}</div>
            <Button onClick={onClose}>Tutup</Button>
          </div>
        ),
      });
      setJmlData(jmlData + 1);
      setTimeout(() => {
        closeModalHandle1();
        setKamar({
          nama: "",
          kategori: "",
          harga: "",
          deskripsi: "",
        });
        setIndexUpdate(null);
      }, 1000);
    }
  };

  const hapusKamar = (index) => {
    const updatedDaftarKamar = [...daftarKamar];
    const tampungData = daftarKamar[index];
    updatedDaftarKamar.splice(index, 1);
    setDaftarKamar(updatedDaftarKamar);
    localStorage.setItem("kamar", JSON.stringify(updatedDaftarKamar));
    toast.success(`Berhasil Hapus Kamar ${tampungData.nama}`);
    setJmlData(jmlData - 1);
    setKamar({
      nama: "",
      kategori: "",
      harga: "",
      deskripsi: "",
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }

    const existingKamar = JSON.parse(localStorage.getItem("kamar")) || [];
    setDaftarKamar(existingKamar);
    renderDaftarKamar();
    return () => {
      localStorage.removeItem("kamar");
    };
  }, [navigate]);

  const renderDaftarKamar = () => {
    return daftarKamar.map((item, index) => (
      <Row key={index} className="mb-4">
        <Col md={12}>
          <Card className="h-100 justify-content-center">
            <Card.Body style={{ display: "flex" }}>
              <div
                className="col-md-2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.kategori === "Standard" ? (
                  <img
                    src={imgStandard}
                    alt="Standard"
                    className="img-fluid rounded"
                  />
                ) : item.kategori === "Superior" ? (
                  <img
                    src={imgSuperior}
                    alt="Tidak Ada Gambar"
                    className="img-fluid rounded"
                  />
                ) : (
                  <img
                    src={imgLuxury}
                    alt="Tidak Ada Gambar"
                    className="img-fluid rounded"
                  />
                )}
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-9" style={{ marginRight: "20px" }}>
                <h1 className="fw-normal display-6">{item.nama}</h1>
                <p className="mb-2">{item.deskripsi}</p>
                <p className="border-top mb-0">
                  Tipe Kamar: <strong>{item.kategori}</strong> • Harga:
                  <strong>Rp. {item.harga}</strong>
                </p>
                <div className="d-flex">
                  <Button
                    variant="danger"
                    className="mt-3"
                    onClick={() => hapusKamar(index)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ marginRight: "4px" }}
                    />
                    Hapus Kamar
                  </Button>
                  <Button
                    variant="primary"
                    className="mt-3"
                    style={{ marginLeft: "10px" }}
                    onClick={() => editKamar(index)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ marginRight: "4px" }}
                    />
                    Edit Kamar
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    ));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }

    const existingKamar = JSON.parse(localStorage.getItem("kamar")) || [];
    setDaftarKamar(existingKamar);
    renderDaftarKamar();
  }, [navigate]);

  const showModalHandle1 = () => {
    setShowModal(true);
  };
  const closeModalHandle1 = () => {
    setShowModal(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleEditSubmit = (event) => {
    event.preventDefault();
    if (
      kamar.nama === "" ||
      kamar.kategori === "" ||
      kamar.harga === "" ||
      kamar.deskripsi === ""
    ) {
      toast.error("Semua Form harus diisi!");
      return;
    } else {
      const updatedDaftarKamar = [...daftarKamar];
      updatedDaftarKamar[indexUpdate] = kamar;
      localStorage.setItem("kamar", JSON.stringify(updatedDaftarKamar));
      setDaftarKamar(updatedDaftarKamar);
      toast.success(`Berhasil Update Data Kamar ${kamar.nama}`);
      closeModalHandle1();
      setKamar({
        nama: "",
        kategori: "",
        harga: "",
        deskripsi: "",
      });
      setIndexUpdate(null);
    }
  };

  const editKamar = (index) => {
    if (index !== null) {
      setIndexUpdate(index);
      const kamarToEdit = daftarKamar[index];
      setKamar(kamarToEdit);
    }
    showModalHandle1();
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
      <Row className="mb-4">
        <Col md={10}>
          <Card className="h-100 justify-content-center">
            <Card.Body>
              <h4>Selamat Datang,</h4>
              <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
              <p className="mb-0">Kamu sudah login sejak:</p>
              <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card>
            <Card.Body>
              <p>Bukti sedang ngantor:</p>
              <img
                src="https://via.placeholder.com/150"
                alt="Tidak Ada Gambar"
                className="img-fluid rounded"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h1 className="mb-3 border-bottom fw-bold">Daftar Kamar</h1>
      <p className="mb-0">
        Grand Atma saat ini memiliki <strong>{jmlData}</strong> jenis kamar yang
        eksotis.
      </p>
      <Button
        variant="success"
        onClick={showModalHandle1}
        className="mt-3"
        style={{ marginBottom: "20px" }}
      >
        <FontAwesomeIcon icon={faSquarePlus} style={{ marginRight: "4px" }} />
        Tambah Kamar
      </Button>

      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={closeModalHandle1}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <h1 className="fw-bold">
            {indexUpdate !== null ? "Edit Kamar" : "Tambah Kamar"}
          </h1>
        </Modal.Header>
        <Modal.Body>
          {indexUpdate !== null ? (
            <EditForm
              kamar={kamar}
              onSubmit={handleEditSubmit}
              onCancel={closeModalHandle1}
              handleChange={handleChange}
            />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Kamar</Form.Label>
                <Form.Control type="text" name="nama" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tipe Kamar</Form.Label>
                <Form.Select name="kategori" onChange={handleChange}>
                  <option value="">Pilih Tipe Kamar</option>
                  <option value="Standard">Standard</option>
                  <option value="Superior">Superior</option>
                  <option value="Luxury">Luxury</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Harga Kamar</Form.Label>
                <Form.Control
                  type="number"
                  name="harga"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deskripsi Kamar</Form.Label>
                <Form.Control
                  as="textarea"
                  name="deskripsi"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  style={{ color: "#ffffff", marginRight: "5px" }}
                />
                Simpan
              </Button>
              <Button
                variant="secondary"
                onClick={closeModalHandle1}
                style={{ marginLeft: "20px" }}
              >
                Batal
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
      {renderDaftarKamar()}
    </Container>
  );
};

export default DashboardPage;
