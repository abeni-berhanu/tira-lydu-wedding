import Nav from '../components/Nav';
import ScrollToTop from '../components/ScrollToTop';
import Hero from '../components/Hero';
import OurWeddingDay from '../components/OurWeddingDay';
import Timeline from '../components/Timeline';
import ChurchLocation from '../components/ChurchLocation';
import Gallery from '../components/Gallery';
import SharePhotos from '../components/SharePhotos';
import RsvpAndWish from '../components/RsvpAndWish';
import MessagesFromGuests from '../components/MessagesFromGuests';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <ScrollToTop />
      <Nav />
      <Hero />
      <OurWeddingDay />
      <Timeline />
      <ChurchLocation />
      <Gallery />
      <SharePhotos />
      <RsvpAndWish />
      <MessagesFromGuests />
      <Footer />
    </main>
  );
}
