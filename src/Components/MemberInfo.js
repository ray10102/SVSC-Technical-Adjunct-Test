const itemsPerPage = 30;

function MemberInfo(props) {
  const repoList = [];
  const followerList = [];
  if (props.repos) {
    for (let i = 0; i < itemsPerPage; i++) {
      const repo = props.repos[i];
      if (!repo) {
        break;
      }
      repoList.push(<p key={i.toString()}>{repo.name}</p>)
    }
  }
  if (props.followers) {
    for (let i = 0; i < itemsPerPage; i++) {
      const follower = props.followers[i];
      if (!follower) {
        break;
      }
      followerList.push(<p key={i.toString()}>{follower.login}</p>)
    }
  }
  return (
    <div className="member-info-container">
      <img src={props.pic} className="member-photo" alt={`${props.login}'s photo`} />
      <p>{`${props.name} (${props.login})`}</p>
      <h2>Repositories</h2>
      <div className="repo-container">
        {repoList}
      </div>
      <h2>Followers</h2>
      <div className="follower-container">
        {followerList}
      </div>
      <p>{`Created on: ${props.creationDate}`}</p>
    </div>
  );
}

export default MemberInfo;
