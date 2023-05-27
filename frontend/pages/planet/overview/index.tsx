import  Header from '../../../components/header'
import MetaHead from '../../../components/MetaHead'
import PlanetOverview from '../../../components/planet/PlanetOverviewTable'

const Planets: React.FC = () => {
    
    
return (
    <>
        <Header />
        <MetaHead title="Planet Overview" />
        <section className="Row Row--center">
            <PlanetOverview />
        </section>
    </>
);
};
export default Planets
