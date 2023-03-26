import Button from "components/Button";
import NavBar from "components/Navbar";

const Home = () => {
  return (
    <div style={{
      background: "radial-gradient(22.25% 31.49% at 58.78% 47.36%, #3c3368 6.81%, #080228 100%"
    }}>
      <NavBar />
      <div className="h-screen">
        <hr className="mx-10 border-[#686262]" />
        <div className="flex mt-20 px-10">
        <div className="px-5">
          <h1 className="text-white font-bold landingTitle mt-10">
            Discover, buy and sell anti-counterfeit shoes
          </h1>
          <p className="text-[#8B8B8B] w-96 font-['Roboto']">
            Digital marketplace for buyer to prevent counterfeit shoes by using
            non-fungible tokens (NFTs)
          </p>
          <Button className="text-white bg-primary mt-7 ml-0">Explore Now</Button>
          <div className="flex list-none mt-8">
            <li className="text-white mr-10">
              <p className="font-bold text-2xl">69k+</p>
              <p className="text-[#8B8B8B]">NFT</p>
            </li>
            <li className="text-white mr-10 ">
              <p className="font-bold text-2xl">12k+</p>
              <p className="text-[#8B8B8B]">Manufacture</p>
            </li>
            <li className="text-white mr-10">
              <p className="font-bold text-2xl">100k+</p>
              <p className="text-[#8B8B8B]">Fake Detection</p>
            </li>
          </div>
        </div>
        <div className="flex justify-center w-full items-center relative">
          <div className="w-80 h-100 overflow-hidden rounded-lg absolute z-50 ">
            <img
              src="../images/shoes.png"
              className="h-full w-full object-cover object-center"
            ></img>
          </div>
          <div className="w-80 h-100 overflow-hidden rounded-lg absolute right-40 z-30">
            <img
              src="../images/shoes2.png"
              className="h-60 w-60 object-cover object-center"
            ></img>
          </div>
          <div className="w-80 h-100 overflow-hidden rounded-lg absolute right-20">
            <img
              src="../images/shoes3.png"
              className="h-50 w-60 object-cover object-center"
            ></img>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
};

export default Home;