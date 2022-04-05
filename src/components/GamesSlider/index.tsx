// Vendors
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Components
import { Game } from '../../types/game'
import { Limiter } from '../Limiter'
import { GameSlide } from '../GameSlide'
import { useSeed } from '../../hooks/useSeed'

import 'swiper/css'
import 'swiper/css/navigation'

import { Circle, Flex, Stack, chakra } from '@chakra-ui/react'
import { useCallback, useState } from 'react'

// Types
export type GamesSliderProps = {
  games: Game[]
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

export const GamesSlider = (props: GamesSliderProps) => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const { games } = props

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
    <Limiter position="relative">
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
          {games.map((game) => {
            return (
              <SwiperSlide key={game.id}>
                <GameSlide game={game} />
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
          {games.map((game, index) => {
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
