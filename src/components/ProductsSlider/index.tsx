// Vendors
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Components
import { Product } from '../../types/game'
import { Limiter } from '../Limiter'
import { ProductSlide } from '../ProductSlide'

import 'swiper/css'
import 'swiper/css/navigation'

import { Circle, Flex, Stack, chakra } from '@chakra-ui/react'
import { useCallback, useState } from 'react'

// Types
export type ProductsSliderProps = {
  products: Product[]
}

type SwiperManager = {
  swiper: SwiperCore
  activeIndex: number
}

const ChakraSwiper = chakra(Swiper)

/*
|-----------------------------------------------------------------------------
| Component
|-----------------------------------------------------------------------------
|
|
*/

export const ProductsSlider = (props: ProductsSliderProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { products } = props

  /*
  |-----------------------------------------------------------------------------
  | States
  |-----------------------------------------------------------------------------
  |
  |
  */
  const [manager, setManager] = useState<SwiperManager>({} as SwiperManager)

  /*
  |-----------------------------------------------------------------------------
  | Functions
  |-----------------------------------------------------------------------------
  |
  |
  */
  const handleChangeSlide = useCallback(
    (index: number) => {
      manager.swiper.slideTo(index)

      setManager({
        ...manager,
        activeIndex: index
      })
    },
    [manager]
  )

  /*
  |-----------------------------------------------------------------------------
  | Effects
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Memos
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Renders
  |-----------------------------------------------------------------------------
  |
  |
  */
  return (
    <Limiter
      position="relative"
      px={{
        base: '0',
        md: '4'
      }}
    >
      <Flex direction={{ base: 'column', md: 'row' }} align="center">
        <ChakraSwiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Autoplay]}
          className="mySwiper"
          onAfterInit={(s) =>
            setManager({
              swiper: s,
              activeIndex: 0
            })
          }
          onSlideChange={(s) =>
            setManager({ ...manager, activeIndex: s.activeIndex })
          }
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          width="100%"
        >
          {products.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <ProductSlide product={product} />
              </SwiperSlide>
            )
          })}
        </ChakraSwiper>
        <Stack
          direction={{
            base: 'row',
            md: 'column'
          }}
          zIndex={99999}
          className="custom-swiper-pagination"
          pl={{ base: 0, md: 4 }}
          py={{ base: 4, md: 0 }}
        >
          {products.map((game, index) => {
            const isActive = manager.activeIndex === index

            return (
              <Circle
                w={{ base: '5px', md: '9px' }}
                h={{ base: '5px', md: '9px' }}
                key={game.id}
                cursor="pointer"
                onClick={() => handleChangeSlide(index)}
                bgColor={isActive ? 'primary.500' : 'gray.500'}
                opacity={isActive ? 1 : 0.5}
              />
            )
          })}
        </Stack>
      </Flex>
    </Limiter>
  )
}
