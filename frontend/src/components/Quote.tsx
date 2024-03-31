export function Quote() {
  return (
    <div className="bg-violet-200 h-screen flex flex-col justify-center items-center ">
      <div className="text-left max-w-xl text-gray-800 ">
        <div className="flex justify-center">
          <img
            src="https://miro.medium.com/v2/resize:fit:8978/1*s986xIGqhfsN8U--09_AdA.png"
            className="w-2/3"
          />
        </div>
        <h1 className="text-3xl font-medium" >
          "This website excels with its user-friendly interface, extensive content, and engaging visuals, delivering a professional and immersive user experience."
          <div className="text-gray-700 text-2xl mt-4 font-normal">
            Jules Winnfield
          </div>
          <div className="text-gray-700 text-xl  font-light">
            CEO | Acme Incl
          </div>
        </h1>
      </div>
    </div>
  );
}

export default Quote;
