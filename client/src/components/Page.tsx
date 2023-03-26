import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  meta?: {
    name: string;
    content: string;
  }[];
}

const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const { title, meta, children, ...other } = props;

  return (
    <>
      <Helmet>
        <title>{`${title} | Hoan Tran`}</title>
        {meta?.map(item => (
          <meta key={item.name} name={item.name} content={item.content} />
        ))}
      </Helmet>
      <div className="h-full" ref={ref} {...other}>
        {children}
      </div>
    </>
  );
});

export default Page;
