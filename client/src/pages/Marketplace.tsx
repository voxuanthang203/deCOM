import Button from 'components/Button';
import Item from 'components/Item';
import NavBar from 'components/Navbar';

const MarketPlace = () => {
  return (
    <div style={{
      background: "radial-gradient(22.25% 31.49% at 58.78% 47.36%, #3c3368 6.81%, #080228 100%"
    }}>
      <NavBar />
      <div className="h-screen">
        <hr className="mx-10 border-[#686262]" />
        <h1 className=" font-bold text-white mx-16 my-10 text-3xl font-[Archivo Black] ">
          Discover More Shoes
        </h1>
        <div className="flex justify-start ml-12">
          <Button className="text-white bg-primary ">All Categories</Button>
          <Button className="text-white border border-primary ">
            Resellers
          </Button>
          <Button className="text-white border border-primary">
            Manufacturers
          </Button>
          <Button className="text-white border border-primary">Nike</Button>
          <Button className="text-white border border-primary">Adidas</Button>
        </div>
        <div className="mt-10 ml-16 flex m-5 flex-wrap">
          <Item className="m-5"></Item>
          <Item className="m-5"></Item>
          <Item className="m-5"></Item>
          <Item className="m-5"></Item>
          <Item className="m-5"></Item>
          <Item className="m-5"></Item>
          <Item className="m-5"></Item>
          <Item className="m-5"></Item>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;