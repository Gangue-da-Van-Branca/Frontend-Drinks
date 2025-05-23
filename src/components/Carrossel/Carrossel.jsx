import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import casamentoIcon from "../../assets/icons/weddingIcon280.svg";
import maletaIcon from "../../assets/icons/maletaIcon280.svg";
import niverIcon from "../../assets/icons/giftIcon280.svg";
import seta from '../../assets/icons/arrow-white.svg'
import divisor from '../../assets/icons/divisor.svg'
import "./Carrossel.css";

function Carrossel() {
  return (
    <Swiper className="crsl"
      slidesPerView={2}   
      spaceBetween={-100}     
      centeredSlides={false} 
      navigation={true}    
    >
      <SwiperSlide className='item'>
        <div className="card-slide">
          <img className="crsl-icon" src={casamentoIcon} alt="Casamento" />
          <div className="rodape">
            <h1>CASAMENTOS</h1>
            <p class="Nunito">DETALHES DO PACOTE <img src={seta} alt="" /></p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide className='divs'>
        <img className='divisor' src={divisor} alt="" />
      </SwiperSlide>

      <SwiperSlide>
        <div className="card-slide">
          <img className="crsl-icon" src={niverIcon} alt="Aniversário" />
          <div className="rodape">
            <h1>ANIVERSÁRIOS</h1>
            <p class="Nunito">DETALHES DO PACOTE <img src={seta} alt="" /></p>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide className='divs'>
        <img className='divisor' src={divisor} alt="" />
      </SwiperSlide>

      <SwiperSlide>
        <div className="card-slide">
          <img className="crsl-icon" src={maletaIcon} alt="Casamento" />
          <div className="rodape">
            <h1>MAIS OPÇÕES</h1>
            <p class="Nunito">DETALHES DO PACOTE <img src={seta} alt="" /></p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Carrossel;
