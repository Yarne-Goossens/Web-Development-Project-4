import Link from 'next/link';
import  Header from './header'
import MetaHead from './MetaHead'
import styles from '@/styles/Home.module.css'

const PlanetOverview:React.FC = () => {
    return (<>
        <Header />
        <MetaHead />
        <main className={styles.main}>
        <div className={styles.description}>
            <p>test</p>
        </div>
      </main>
    </>)
}
export default Header;