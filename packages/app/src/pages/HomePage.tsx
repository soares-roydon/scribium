import Footer from '@/features/home/components/Footer';
import Main from '@/features/home/components/Main';
import NavBar from '@/features/home/components/NavBar';

const HomePage = () => {
   return (
      <>
         <div className="h-dvh flex flex-col justify-between bg-violet-50">
            <NavBar />
            <Main />
            <Footer />
         </div>
      </>
   );
};

export default HomePage;
