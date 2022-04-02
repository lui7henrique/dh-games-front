import React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import { Button, Text } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>hub xp | template</title>
        <meta name="hub xp template" content="nextjs chakra ui template" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          textAlign="center"
        >
          <strong>hub xp template</strong>
          <br />
          <a href="https://nextjs.org" target="_blank" rel="noreferrer">
            Next.js +
          </a>
          <a href="https://chakra-ui.com/" target="_blank" rel="noreferrer">
            {' '}
            ChakraUI
          </a>

          <br />
          <Button
            bgColor="#FF0080"
            color="#FFFFFF"
            _hover={{ bgColor: '#7928CA' }}
            transition="all 0.4s"
            as={'a'}
            href="https://github.com/hub-xp/nextjs-chrakraui-template/stargazers"
            target="_blank"
            rel="noreferrer"
          >
            Give some love 🤍
          </Button>
        </Text>
      </main>
    </div>
  )
}

export default Home
