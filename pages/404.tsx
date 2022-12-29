import Link from 'next/link';

function NotFound() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <img src='/NotFound.svg' alt='' width='400px' />
      <h3 className='mb-3 mt-5'>Page Not Found</h3>
      <span>Feeling under the weather?</span>
      <Link className='btn mt-3 py-2 btn-dark' href='/'>
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
