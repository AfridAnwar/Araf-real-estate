import HeroEditorial from '../../components/HeroEditorial/HeroEditorial';
import Manifesto from '../../components/Manifesto/Manifesto';
import Scale from '../../components/Scale/Scale';
import Philosophy from '../../components/Philosophy/Philosophy';
import Masterpieces from '../../components/Masterpieces/Masterpieces';
import Anatomy from '../../components/Anatomy/Anatomy';
import Disciplines from '../../components/Disciplines/Disciplines';
import Journal from '../../components/Journal/Journal';
import Invitation from '../../components/Invitation/Invitation';

export default function Home() {
  return (
    <div className="bg-bg-primary">
      <HeroEditorial />
      <Manifesto />
      <Scale />
      <Philosophy />
      <Masterpieces />
      <Anatomy />
      <Disciplines />
      <Journal />
      <Invitation />
    </div>
  );
}
