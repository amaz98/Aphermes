const CustomIonIcon = ({ icon, role,style}) => {
  return (
    <ion-icon
      icon={icon}
      role={role || ""}
      class={'md'}
      style={style}
    ></ion-icon>
  );
};

export default CustomIonIcon;
