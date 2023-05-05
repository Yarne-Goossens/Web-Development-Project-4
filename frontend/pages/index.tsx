import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import  Header from '../components/header'
import MetaHead from '../components/MetaHead'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <MetaHead title="Planet Home"/>
      <Header />
      <main>
        <div className={styles.slogan}>
          <p>
            Own a Piece of the Universe - Buy Your Own Planet Today!
          </p>
        </div>
      </main>
    </>
  )
}
