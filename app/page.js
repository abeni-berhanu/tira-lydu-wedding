import Nav from '../components/Nav';
import Hero from '../components/Hero';
import OurWeddingDay from '../components/OurWeddingDay';
import Timeline from '../components/Timeline';
import ChurchLocation from '../components/ChurchLocation';
import Gallery from '../components/Gallery';
import SharePhotos from '../components/SharePhotos';
import LeaveANote from '../components/LeaveANote';
import MessagesFromGuests from '../components/MessagesFromGuests';
import FinalRSVP from '../components/FinalRSVP';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <OurWeddingDay />
      <Timeline />
      <ChurchLocation />
      <Gallery />
      <SharePhotos />
      <LeaveANote />
      <MessagesFromGuests />
      <FinalRSVP />
    </main>
  );
}
