import Link from 'next/link';

const Header:React.FC = () => {
    return (<header>
        <a>Planet Shop</a>
        <nav>
            <Link href="/">Home</Link>
            <Link href="/PlanetAdd">Add Planet</Link>
            <Link href="/PlanetOverview">Planet Overview</Link>
        </nav>
    </header>)
}
export default Header;