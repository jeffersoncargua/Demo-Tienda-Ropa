// Este pagina permite mostrar informacion de la venta para que el usuario vea que todo el proceso fue un exito

import { useCallback, useEffect, useState } from "react"
import { BuscarUsuario } from "../../services/UserService";
import { useSearchParams } from "react-router";

export const PaymentSuccess = () => {

  const [costumer, setCostumer] = useState({});
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");

  const GetUser = useCallback(
    async(identificacion) => {
      console.log(identificacion);
      let response = await BuscarUsuario(identificacion);
      if(response.isSuccess){
        setCostumer(response.result);
        setMessage("Su compra se ha realizado con éxito. !Gracias por su preferencia.");
      }else{
        setCostumer({});
        setMessage("");
      }
    },
    []
  )
  

  useEffect(() => {
    const identiticacion = searchParams.get('identificacion');
    console.log(identiticacion);
    GetUser(identiticacion);
  }, [GetUser, searchParams])

  return (
    <div className={` ${costumer.identificacion ? 'flex':'hidden'} w-[90%] md:w-[80%]  flex-col mx-auto min-h-full space-y-5 my-20`}>
        <div className="flex items-center justify-center w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-green-500/50 mx-auto p-5">
          <svg xmlns="http://www.w3.org/2000/svg"fill="currentColor" className="bi bi-cart-check-fill mx-auto my-auto w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 text-green-700" viewBox="0 0 16 16">
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708"/>
          </svg>
        </div>
        <span className="my-5 font-semibold text-left text-xl md:text-3xl text-shadow-lg/80 text-shadow-neutral-500">Estimado/a, {costumer.nombres}</span>
        <span className="font-semibold md:text-2xl text-lg text-justify text-shadow-lg/80 text-shadow-neutral-500" >{message}</span>
        <button 
            type="button"
            onClick={() => navigate('/')}
            className="hover:border-2 border-black bg-green-600 hover:bg-conic/increasing from-yellow-500 via-lime-500 to-yellow-500 px-2 py-1.5 rounded-lg hover:text-white mx-auto flex flex-row items-center group transition-transform delay-150 duration-150 ease-in-out hover:scale-110 text-xs md:text-sm my-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-house-door-fill group-hover:text-white w-5 h-5 me-2.5" viewBox="0 0 16 16">
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
            </svg>
            Regresar al Inicio
        </button>
    </div>
  )
}
