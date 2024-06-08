import { useDispatch } from 'react-redux';
import {
  actualizarNombreCliente,
  actualizarNumeroTelefono,
} from '../../redux/actions/nuevaOrden.action';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css';

export const DatosPersonalesModal = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  // TODO: no mostrar el codigo del pais, o que no se pueda borrar el codigo del pais.
  const dispatch = useDispatch();

  const actualizarDatosPersonales = () => {
    const nombre = (document.getElementById('nombre') as HTMLInputElement)
      ?.value;
    const telefono = (document.getElementById('telefono') as HTMLInputElement)
      ?.value;
    // @ts-expect-error need to fix this
    dispatch(actualizarNombreCliente(nombre));
    // @ts-expect-error need to fix this
    dispatch(actualizarNumeroTelefono(telefono));
    closeModal();
  };

  return (
    <>
      <div className="modal-box h-[1800px] dark:bg-white bg-[base-100] shadow-lg rounded-t-[90px] border-4">
        <div className="flex items-center flex-col">
          <div className="flex items-center flex-col py-[300px] ">
            <h1 className="text-[60px] font-bold ">Ingresa tus datos</h1>
            <form action="">
              <div className="flex flex-col pt-[170px] w-full ">
                <label htmlFor="nombre" className="text-[30px] font-bold my-10">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="w-[600px] text-[40px] appearance-none bg-transparent border-b-2 border-black py-1 px-2 leading-tight focus:outline-none "
                  autoComplete="off"
                />

                <label
                  htmlFor="telefono"
                  className="text-[30px] font-bold mb-5 my-16"
                >
                  Teléfono
                </label>
                <PhoneInput
                  country={'bo'}
                  inputProps={{
                    type: 'tel',
                    name: 'telefono',
                    id: 'telefono',
                    className:
                      'w-[600px] text-[40px]  appearance-none bg-transparent border-b-2 border-black py-1 px-2 leading-tight focus:outline-none px-20',
                    autoComplete: 'off',
                  }}
                />
              </div>
            </form>
          </div>
          <div className="text-center my-[127px] space-x-[100px]  flex justify-between mx-40 ">
            <button
              className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16"
              onClick={closeModal}
            >
              Volver{' '}
            </button>
            <button
              className="btn btn-primary w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16"
              onClick={actualizarDatosPersonales}
            >
              Seguir
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
