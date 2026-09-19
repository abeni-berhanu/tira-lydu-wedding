import Nav from '../components/Nav';
import ScrollToTop from '../components/ScrollToTop';
import Hero from '../components/Hero';
import OurWeddingDay from '../components/OurWeddingDay';
import Gallery from '../components/Gallery';
import SharePhotos from '../components/SharePhotos';
import Timeline from '../components/Timeline';
import ChurchLocation from '../components/ChurchLocation';
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
      <Gallery />
      <SharePhotos />
      <Timeline />
      <ChurchLocation />
      <RsvpAndWish />
      <MessagesFromGuests />
      <Footer />
    </main>
  );
}
