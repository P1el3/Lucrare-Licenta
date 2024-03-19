import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../img/carousel/img1.jpg";
import img2 from "../img/carousel/img2.jpg";
import img3 from "../img/carousel/img3.jpg";
import img4 from "../img/carousel/img4.jpg";
import img5 from "../img/carousel/img5.jpg";

export default function ImageCarousel() {
  // Configurații pentru Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    cssEase: "linear",
    adaptiveHeight: true
  };

  return (
    <div style={{ width: "100vw" }}> 
      <Slider {...settings}>
        <div>
          <img src={img1} alt="image 1" style={{ width: "100%", height: "50vh" }} />
        </div>
        <div>
          <img src={img2} alt="image 2" style={{ width: "100%", height: "50vh" }} />
        </div>
        <div>
          <img src={img3} alt="image 3" style={{ width: "100%", height: "50vh" }} />
        </div>
        <div>
          <img src={img4} alt="image 4" style={{ width: "100%", height: "50vh" }} />
        </div>
        <div>
          <img src={img5} alt="image 5" style={{ width: "100%", height: "50vh" }} />
        </div>
      </Slider>
    </div>
  );
}
