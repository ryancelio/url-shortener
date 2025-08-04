const ErrorPopup = ({ msg }: { msg: string }) => {
  return (
    <div className=" bg-red-600 border-red-900 w-fit p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all shadow-black h-full text-center">
      <p>{msg}</p>
    </div>
  );
};

export default ErrorPopup;
