const shoes = [
  {
    price: 0.1,
    name: "Nike Air Force 1 Golden",
    image_url: "/images/Nike_Air_Force_1_Golden.jpeg",  
  },
  {
    price: 0.2,
    image_url: "/images/Nike_Future.png",
    name: "Nike Future",
  },
  {
    price: 0.1,
    image_url: "/images/Nike_Air_Force_1_Golden.jpeg",
    name: "Nike Air Force 1 Golden",
  },
  {
    price: 0.2,
    image_url: "/images/Nike_CyberKick.png",
    name: "Nike CyberKick",
  },
  {
    price: 0.1,
    image_url: "/images/Nike_Multi_Cul.png",
    name: "Nike Multi Cul",
  },
  {
    price: 0.1,
    image_url: "/images/Nike_Air_Force_1_Golden.jpeg",
    name: "Nike Air Force 1 Golden",
  },
  {
    price: 0.2,
    image_url: "/images/Nike_CyberKick.png",
    name: "Nike CyberKick",
  },
  {
    price: 0.1,
    image_url: "/images/Nike_Multi_Cul.png",
    name: "Nike Multi Cul",
  },
  {
    price: 0.5,
    image_url: "/images/HyperDunk.avif",
    name: "HyperDunk",
  },
  {
    price: 1,
    image_url: "/images/AdidasCollapse.avif",
    name: "Adidas Collape",
  }
]

const ShoeShuffle = () => {
  return shoes.sort(() => Math.random() - 0.5);
}

export default ShoeShuffle;