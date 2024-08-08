import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

interface ImageCarouselProps {
  images: string[]
}

const CarouselImage: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <div className='w-full'>
      <Swiper spaceBetween={0} slidesPerView={1} pagination={{ clickable: true }}>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className='h-full '>
              <img src={image} alt={`postImage-${index}`} className=' h-full object-cover rounded-xl' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarouselImage
