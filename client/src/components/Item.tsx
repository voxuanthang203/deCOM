interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  image_url: string;
  name: string;
}

const Item = (props: ItemProps) => {
  const { className, price, image_url, name, ...rest } = props;
  return (
    <div>
      <div className={`flex flex-col overflow-hidden rounded-lg bg-white ${className}`} {...rest}>
        <img src={image_url} className="max-h-44"/>
        <p className="font-bold font-[Archivo Black] text-lg text-center py-2">
            {name}
        </p>
        <div className="flex justify-between items-center h-10 bg-white px-2 border-t border-gray-600">
          <div className="flex items-center">
            <img src="/images/ethereum.png" className="w-5 h-5"></img>
            <p className="p-1 text-[#269846] font-bold font-[Archivo Black]">
              {price} ETH
            </p>
          </div>
          <button className="font-bold font-[Archivo Black] text-primary text-lg">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;