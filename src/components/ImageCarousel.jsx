import { Carousel } from "react-bootstrap";

const ImageCarousel = ({ images }) => {
  return (
    <Carousel>
      {images?.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            src={image.img}
            alt={image.title}
            className="d-block w-100"
          />
          <Carousel.Caption>
            <h3 className="d-none d-md-block">{image.title}</h3>
            <p className="d-none d-md-block">{image.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;