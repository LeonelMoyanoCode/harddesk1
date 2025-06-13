import LogoImg from '../../assets/logo.png';

export const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src={LogoImg} 
        alt="Logo" 
        className="w-[180px] sm:w-[180px]"  // La imagen está oculta en pantallas menores a sm
      />

    </div>
  );
};
