function Stories() {
  const users = [
    {
      name: "Your Story",
      img: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "john",
      img: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "emma",
      img: "https://i.pravatar.cc/150?img=3"
    },
    {
      name: "alex",
      img: "https://i.pravatar.cc/150?img=4"
    },
    {
      name: "sophia",
      img: "https://i.pravatar.cc/150?img=5"
    }
  ];

  return (
    <div className="stories">
      {users.map((user, index) => (
        <div key={index} className="story">
          <img src={user.img} alt={user.name} />
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Stories;