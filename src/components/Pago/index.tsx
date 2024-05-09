import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import { QrModal } from './QrModal';
import { TarjetaModal } from './TarjetaModal';

import { actualizarMetodoDePago } from '../../redux/actions/nuevaOrden.action';
// import { useLazyQuery } from '@apollo/client';
// import { PROFILE_QUERY } from '../../api/graphql/query';

export const Pago = () => {
  // TODO: UI/UX como en figma.
  // TODO: crear el modal de la factura. "seguir sin datos" cierras el modal, "seguir" cierras el modal.

  // TODO: cambiar recibo.tsx a Agradecimiento.tsx
  // CHECK
  // TODO: acceder al profile_query y en base a los pagos habilitados mostrar los botones.

  // TODO: quitar el codigo de setTimeout 10 segundos.
  // CHECK

  const navigate = useNavigate();
  const nuevaOrden = useSelector((state: RootState) => state.nuevaOrdenReducer);
  const dispatch = useDispatch();

  // const [getPerfil] = useLazyQuery(PROFILE_QUERY, {
  //   onCompleted: (data) => {
  //     localStorage.setItem(
  //       'Perfil',
  //       JSON.stringify(data.KIOSCO_getPerfilActivo),
  //     );
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  const [qrModal, setQrModal] = useState<boolean>(false);
  const [, setTarjetaModal] = useState<boolean>(false);
  // const conFactura = true;

  const seleccionarPago = (metodoDePago: string) => {
    // @ts-expect-error need to fix this
    dispatch(actualizarMetodoDePago(metodoDePago));
    if (metodoDePago === 'QR') {
      // @ts-expect-error need to fix this
      document.getElementById('my_modal_5').showModal();
      setQrModal(true);
    }
    if (metodoDePago === 'TARJETA') {
      setTarjetaModal(true);
      // @ts-expect-error need to fix this
      document.getElementById('my_modal_5').showModal();
    }
  };

  // useEffect(() => {
  //   if (qrModal || tarjetaModal) {
  //     navigate('/');
  //     window.location.reload();
  //   }
  // }, [navigate, qrModal, tarjetaModal]);

  const abrirPaginaAgradecimiento = () => {
    window.open('/recibo', '_blank');
  };

  return (
    <>
      <div className="flex items-center flex-col pt-[132px] ">
        <h1 className="text-[60px] font-bold ">¿Cómo desea pagar?</h1>
        {/* SECCION DE BOTONES */}
        <div className="w-[90%] flex items-center flex-wrap justify-center pt-[347px]">
          <div className="w-1/2 flex justify-center ">
            <button className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center">
              <Icon
                icon="fa:dollar"
                className="w-[120px] h-[120px]"
                onClick={() => {
                  seleccionarPago('EFECTIVO');
                  navigate('/');
                  abrirPaginaAgradecimiento();

                  window.location.reload();
                }}
              />
              <p className="text-3xl">Efectivo</p>
            </button>
          </div>

          <div className="w-1/2 flex justify-center -ml-16">
            <button
              className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center"
              onClick={() => {
                seleccionarPago('QR');
              }}
            >
              <Icon
                icon="material-symbols:qr-code"
                className="w-[120px] h-[120px]"
              />
              <p className="text-3xl">QR</p>
            </button>
          </div>
          <div className="w-1/2 flex justify-center pt-16">
            <button
              className="btn btn-primary w-[300px] h-[300px] rounded-[20px] flex flex-col items-center justify-center"
              onClick={() => {
                seleccionarPago('TARJETA');
              }}
            >
              {' '}
              <Icon
                icon="bi:credit-card-fill"
                className="w-[120px] h-[120px]"
              />
              <p className="text-3xl">Tarjeta</p>
            </button>
          </div>
        </div>
        {/* FIN DE SECCION DE BOTONES */}

        {/* SECCION DEL MODAL  */}
        <dialog
          id="my_modal_5"
          className="modal modal-bottom  transition-all duration-800"
        >
          {/* // condicional para mostrar el modal de qr o modal de tarjeta */}
          {qrModal ? (
            <QrModal
              cuentaTotal={nuevaOrden.cuentaTotal}
              closeModal={() => {
                setQrModal(false);

                // @ts-expect-error need to fix this
                document.getElementById('my_modal_5').close();
              }}
            />
          ) : (
            <TarjetaModal
              cuentaTotal={nuevaOrden.cuentaTotal}
              closeModal={() => {
                setTarjetaModal(false);
                // @ts-expect-error need to fix this
                document.getElementById('my_modal_5').close();
              }}
            />
          )}
        </dialog>

        {/* FIN DE SECCION DEL MODAL  */}

        {/* SECCION DE TOTAL */}
        <div className="py-32">
          <h1 className="text-center text-primary font-bold text-[56px]  ">
            Total Bs.{nuevaOrden.cuentaTotal}
          </h1>
          <div className="text-center   flex justify-between mx-40 pt-20">
            <button className="btn btn-gosth w-[329px] h-[190px] text-[30px] rounded-[20px] mb-16">
              <Link
                to="/checkout"
                className="w-full h-full flex items-center justify-center"
              >
                Volver
              </Link>
            </button>
          </div>
        </div>
        {/* FIN DE SECCION DE TOTAL */}
      </div>
    </>
  );
};
