// Esta pagina permite mostrar al usuario cuando buscar algun recurso o pagina que no existe

import { useNavigate } from "react-router"

export const PageNotFound = () => {

    const navigate = useNavigate();

  return (
    <div className="w-[90%] md:w-[80%] min-h-full my-20 flex flex-col justify-center space-y-10 mx-auto" >
        <span className="font-extrabold text-7xl md:text-9xl text-center text-shadow-lg text-shadow-neutral-500 font-rubikDistressed" >404 !</span>
        <span className="font-semibold text-2xl text-center text-shadow-lg/90 text-shadow-gray-400 underline decoration-4 underline-offset-8 decoration-purple-700">No se encontró el recurso solicitado. Inténtelo nuevamente</span>
        <button 
            type="button"
            onClick={() => navigate('/')}
            className="hover:border-2 border-black bg-green-600 hover:bg-conic/increasing from-yellow-500 via-lime-500 to-yellow-500 px-2 py-1.5 rounded-lg hover:text-white mx-auto flex flex-row items-center group transition-transform delay-150 duration-150 ease-in-out hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-house-door-fill group-hover:text-white w-5 h-5 me-2.5" viewBox="0 0 16 16">
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
            </svg>
            Regresar al Inicio
        </button>
    </div>
  )
}
