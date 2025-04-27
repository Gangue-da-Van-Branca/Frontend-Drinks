import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import casamentoIcon from '../../assets/icons/casamentoIcon.png';
import niverIcon from '../../assets/icons/niverIcon.svg';
import seta from '../../assets/icons/arrow-white.svg'
import divisor from '../../assets/icons/divisor.svg'
import "./Carrossel.css";

function Carrossel() {
  return (
    <Swiper className="crsl"
      slidesPerView={2}   // Um slide inteiro + pedaço do próximo
      spaceBetween={-100}     // Espaço entre os slides
      centeredSlides={false} // Não centraliza, começa na esquerda
      navigation={true}      // Ativa botões Next/Prev automáticos
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
          <img className="crsl-icon" src={casamentoIcon} alt="Casamento" />
          <div className="rodape">
            <h1>MAIS OPÇÕES</h1>
            <p class="Nunito">DETALHES DO PACOTE <img src={seta} alt="" /></p>
          </div>
        </div>
      </SwiperSlide>

      {/* Adicione mais slides conforme necessário */}
    </Swiper>
  );
}

export default Carrossel;
