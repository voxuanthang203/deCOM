import { Item } from 'components/Item';

// TODO: Edit this to be a marketplace page
// TODO: Fetch data from the backend
const MarketPlace = () => {
  console.log('MarketPlace');
  return (
    <>
      <div className='bg-[radial-gradient(22.25% 31.49% at 58.78% 47.36%, #3c3368 6.81%, #080228 100%)]'>
        <div>
          <div className="h-screen">
            <hr className="mx-10 border-[#686262]" />
            <h1 className=" font-bold text-white mx-16 my-10 text-3xl font-[Archivo Black] ">
              Discover More Shoes
            </h1>
            <div className="flex justify-start ml-12">
              <button className="text-white bg-primary ">All Categories</button>
              <button className="text-white border border-primary ">
                Resellers
              </button>
              <button className="text-white border border-primary">
                Manufacturers
              </button>
              <button className="text-white border border-primary">Nike</button>
              <button className="text-white border border-primary">Adidas</button>
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
      </div>
    </>
  );
};

export default MarketPlace;