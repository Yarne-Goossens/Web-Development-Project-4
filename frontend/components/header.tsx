import Link from 'next/link';

const Header:React.FC = () => {
    return (<header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
        {/*<a className="fs-2 d-flex justif-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">Planet Shop</a>*/}
        <nav className='nav justify-content-center'>
            <Link href="/" className='nav-link px-4 fs-5 text-white'>Home</Link>
            {/* <Link href="/planet/planetadd" className='nav-link px-4 fs-5 text-white'>Add Planet</Link> */}
            <Link href="/planet/overview" className='nav-link px-4 fs-5 text-white'>Planet Overview</Link>
            <Link href="/satellite/overview" className='nav-link px-4 fs-5 text-white'>Satellite Overview</Link>
            <Link href="/resource/overview" className='nav-link px-4 fs-5 text-white'>Resource Overview</Link>
            <Link href="/account/overview" className='nav-link px-4 fs-5 text-white'>Account Overview</Link>
            <Link href="/planet/add" className='nav-link px-4 fs-5 text-white'>planet add</Link>
        </nav>
    </header>)
}
export default Header;