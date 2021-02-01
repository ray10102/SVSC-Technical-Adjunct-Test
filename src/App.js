import MemberInfoWithData from './Components/MemberInfoLogicContainer';
import Member from './Components/Member';
import Search from './Components/Search';
import PaginationButtons from './Components/PaginationButtons';
import { useState, useEffect } from 'react';
import './App.css';

const itemsPerPage = 30;

function App() {
  const [page, setPage] = useState(1);
  const [memberState, setMembers] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentMember, setCurrMember] = useState(null);

  // Fetch members on mount and page changes
  useEffect(() => {   
    const members = [];
    // Unauthenticated fetching, subject to rate limits
    fetch(`https://api.github.com/orgs/facebook/public_members?page=${page}`)
    .then(response => {
      if (!response.ok) {
        // throw an unhandled error, would want to handle/display an error page in practice
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const regexp = /page=\d+>; rel="last"/;
      const matches = regexp.exec(response.headers.get('link'));
      if (matches) {
        const i = matches[0].indexOf('>');
        // start substring after "page="
        setPageCount(matches[0].substring(5, i));
      } else { // if no match, this is the last page
        setPageCount(page);
      }
      return response.json();
    })
    .then(data => {
      for (let i = 0; i < itemsPerPage; i++) {
        const member = data[i];
        if (!member) {
          break;
        }
        members.push(<Member key={i.toString()} login={member.login} pic={member.avatar_url} onClick={getOnMemberClick(member.login)}/>)
      }
      setMembers(members);
    });
  }, [page]);

  const handleSearch = (login) => {
    fetch(`https://api.github.com/orgs/facebook/public_members/${login}`)
      .then(response => {
        if (!response.ok) {
          alert("The user you're searching for is not in this group. Try again.");
        } else {
          setCurrMember(login);
        }
      });
  }

  const getOnMemberClick = (login) => {
    return () => {
      setCurrMember(login);
    };
  }

  const getPaginationOnClick = (page) => {
    return () => {
      setPage(page);
    }
  }

  return (
    <div className="App">
      <Search handleSubmit={handleSearch} />
      {currentMember ?
        <>
          <a onClick={getOnMemberClick(null)}>Back</a>
          <MemberInfoWithData login={currentMember} /> 
        </>:
        <>
          <div className="member-list">
            {memberState}
          </div>
          <PaginationButtons page={page} pageCount={pageCount} getOnClick={getPaginationOnClick} />
        </>}
    </div>
  );
}

export default App;
