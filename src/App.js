import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Message = (content) => {
  return (
  <div className="p-2">
  <div className="inline-flex items-center bg-white leading-none text-purple-600 rounded-full p-2 shadow text-sm">
    <span className="inline-flex bg-purple-600 text-white rounded-full h-6 px-3 justify-center items-center text-">Purple</span>
    <span className="inline-flex px-2">{content}</span>
  </div>
</div>
  )

} 



function App() {
  const [pan, setPan] = useState();
  const [mobile, setMobile] = useState();
  let { slug } = useParams();
  const [isVisible, setIsVisible] = useState(0);


  const sendRequest = async (mobile, pan, slug) => {
    let results;
    try {
      results = await fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: mobile,
          pan: pan,
          uuid: slug,
        }),
      });
    } catch (error) {
      console.log(error)
    }
    const body = await results.json();
    if (!results.ok) {
      setIsVisible(true)
      console.log(results)
    } else return { token: body.result.id };
  };

  return (

    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
            <h3 className="font-bold text-2xl">welcome</h3>
            <p className="text-gray-600 pt-2">cashout</p>
        </section>

        <section className="mt-10">
            <form className="flex flex-col">
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="mobile">mobile</label>
                    <input type="text" onChange={ e=> setPan(e.target.value)} id="mobile" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"/>
                </div>
                <div className="mb-6 pt-3 rounded bg-gray-200">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" htmlFor="pan">pan</label>
                    <input type="text" onChange={ e=> setMobile(e.target.value)} id="pan" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"/>
                </div>

                <button onSubmit={()=> sendRequest(pan, mobile, slug)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200">submit</button>
            </form>
        </section>

        {isVisible? <Message/>: "loading"}
        {/* <Message /> */}
       
    </main>

  );
}

export default App;
