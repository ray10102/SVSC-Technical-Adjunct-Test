import MemberInfo from './MemberInfo';
import { useState, useEffect} from 'react';

function MemberInfoWithData(props) {
  const [followers, setFollowers] = useState({});
  const [repos, setRepos] = useState({});
  const [name, setName] = useState('');
  const [pic, setPic] = useState('');
  const [creationDate, setCreationDate] = useState('');
  useEffect(() => {
    fetch(`https://api.github.com/users/${props.login}/repos`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setRepos(data);
      });

    fetch(`https://api.github.com/users/${props.login}/followers`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setFollowers(data);
      });

    fetch(`https://api.github.com/users/${props.login}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCreationDate(data.created_at);
        setName(data.name);
        setPic(data.avatar_url);
      });
  }, [props.login]);

  return (
    <MemberInfo 
        login={props.login}
        pic={pic}
        name={name} 
        creationDate={creationDate}
        repos = {repos}
        followers = {followers}
    />
  );
}

export default MemberInfoWithData;
