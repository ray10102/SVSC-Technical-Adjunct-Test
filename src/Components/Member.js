function Member(props) {
  return (
    <div className="member-container" onClick={props.onClick}>
        <img src={props.pic} className="member-photo" alt={`${props.login}'s profile picture`}/>
        <p>
          {props.login}
        </p>
    </div>
  );
}

export default Member;
