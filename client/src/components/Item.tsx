const Item = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props;
  return (
    <div className={`box overflow-hidden ${className}`} {...rest}>
      <img src="/images/nftshoes.png"></img>
      <div className="flex mt-2">
        <img src="/images/ethereum.png" className="w-8 h-8"></img>
        <p className="p-1 text-[#269846] font-bold font-[Archivo Black]">
          0.25 ETH
        </p>
      </div>
      <div className="flex justify-end mr-5">
        <button className="font-bold font-[Archivo Black] text-primary text-lg mb-10">
          Buy
        </button>
      </div>
    </div>
  );
};

export default Item;