// @ts-nocheck
import { useState } from 'react';
import Item from 'components/Item';
import NavBar from 'components/Navbar';
import ShoeShuffle from 'Shoes';

const MintModal = (props) => {
  const { setData } = props;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  return (
    <>
    <button 
      onClick={() => setOpen(true)}
      data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-28" type="button">
      Mint NFT
    </button>
    <div id="defaultModal" className={`fixed top-0 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full ${open ? "": "hidden"}`}>
        <div className="relative w-full h-full max-w-2xl md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="font-extrabold text-xl">
                        Mint NFT
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal" 
                      onClick={() => setOpen(false)}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-6 space-y-6 justify-center items-center flex">
                  <div className="flex flex-col gap-4 max-w-sm text-black">
                    <input type="text" name="name" id="name" 
                      placeholder='Name'
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      />
                    <input type="text" name="price" id= "price"
                      placeholder='Price'
                      onChange={(e) => setPrice(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={price}
                      />
                    <img src={image} alt="" />
                    <input type="file" name="image" id="image" 
                      placeholder='Image'
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          let img = event.target.files[0];
                          setImage(URL.createObjectURL(img));
                        }
                      }}
                      />
                  </div>
                </div>
                <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button 
                      onClick={() => {
                        console.log(name, price, image);
                        setData({
                          name: name,
                          price: price,
                          image_url: image,
                        })
                        setOpen(false);
                      }}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      I accept
                    </button>
                </div>
            </div>
        </div>
    </div>
  </>
  )
} 

const Manufacturers = () => {
  const [newCreated, setNewCreated] = useState({
    name: "",
    price: "",
    image_url: "",
  })
  const [shoes, setShoe] = useState(ShoeShuffle());
  return (
    <div style={{
      background: "radial-gradient(22.25% 31.49% at 58.78% 47.36%, #3c3368 6.81%, #080228 100%"
    }}>
      <NavBar />
      <div className="h-screen">
        <hr className="mx-10 border-[#686262] mb-20" />
        <div className="mt-20">
          <MintModal
            setData={(data) => setNewCreated(data)}
          />
          <h1 className="text-white mx-28 mt-10 font-extrabold text-3xl">
            Currently Own NFT
          </h1>
          <div className="flex flex-wrap mx-28 mt-10 gap-8">
            {newCreated.name && (
              <Item
                name={newCreated.name}
                image_url={URL.createObjectURL(newCreated.image_url)}
                price={newCreated.price}
              />
            )}
            {shoes.map((shoe, index) => {
              if (shoe.name.includes("Nike")) {
                return (
                  <Item
                    key={index}
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
