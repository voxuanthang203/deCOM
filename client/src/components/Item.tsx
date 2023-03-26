const Item = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div className={`flex flex-col overflow-hidden rounded-lg  ${className}`} {...rest}>
      <img src="/images/nftshoes.png" className="max-h-44"/>
      <div className="flex justify-between items-center h-14 bg-white px-2">
        <div className="flex items-center">
          <img src="/images/ethereum.png" className="w-5 h-5"></img>
          <p className="p-1 text-[#269846] font-bold font-[Archivo Black]">
            0.25 ETH
          </p>
        </div>
        <button className="font-bold font-[Archivo Black] text-primary text-lg">
          Buy
        </button>
      </div>
    </div>
  );
};

export default Item;