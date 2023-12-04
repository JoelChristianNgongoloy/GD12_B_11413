import React from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const EditForm = ({ kamar, onSubmit, onCancel, handleChange }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nama Kamar</Form.Label>
        <Form.Control
          type="text"
          name="nama"
          value={kamar.nama}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tipe Kamar</Form.Label>
        <Form.Select
          name="kategori"
          onChange={handleChange}
          value={kamar.kategori}
        >
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
          value={kamar.harga}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Deskripsi Kamar</Form.Label>
        <Form.Control
          as="textarea"
          name="deskripsi"
          value={kamar.deskripsi}
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
      <Button variant="secondary" onClick={onCancel} style={{marginLeft: "20px"}}>
        Batal
      </Button>
    </Form>
  );
};

export default EditForm;
