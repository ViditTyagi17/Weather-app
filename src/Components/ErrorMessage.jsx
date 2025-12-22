

function ErrorMessage({error}) {
  

  if(!error)return null;
  return (
    
      <div role='alert' className='mt-3 bg-red-500 text-white p-2 rounded-md text-sm sm:text-xl shadow-md animate-fadeIn text-center '  >
       <p>{error}</p>
      </div>
  
  )
}

export default ErrorMessage
