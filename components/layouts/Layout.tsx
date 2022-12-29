type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className='w-100 container'>
      <div
        className='row justify-content-center align-items-center'
        style={{ minHeight: '100vh' }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
