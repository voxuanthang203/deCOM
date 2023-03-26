import Button from 'components/Button';
import Item from 'components/Item';
import NavBar from 'components/Navbar';
import ShoeShuffle from 'Shoes';

const Manufacturers = () => {
  return (
    <div style={{
      background: "radial-gradient(22.25% 31.49% at 58.78% 47.36%, #3c3368 6.81%, #080228 100%"
    }}>
      <NavBar />
      <div className="h-screen">
        <hr className="mx-10 border-[#686262] mb-20" />
        <div className="mt-20">
          <Button className=" text-white font-extrabold text-xl bg-primary rounded-xl ml-28">
            Mint NFT
          </Button>
          <h1 className="text-white mx-28 mt-10 font-extrabold text-3xl">
            Currently Own NFT
          </h1>
          <div className="flex flex-wrap mx-28 mt-10 gap-8">
            {ShoeShuffle().map((shoe) => {
              if (shoe.name.includes("Nike")) {
                return (
                  <Item
                    key={shoe.name}
                    name={shoe.name}
                    image_url={shoe.image_url}
                    price={shoe.price}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manufacturers;
