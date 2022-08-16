const Technology = ({ item }) => {
  return (
    <div className="div-technology">
      <p className="p-tech">{item.title}</p>
      <div className="div-status">
        <p className="p-status">{item.status}</p>
        <img className="status-img" src="./icons/Vector.png" alt="" />
      </div>
    </div>
  );
};
export default Technology;
