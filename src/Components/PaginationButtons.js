function Member(props) {
    const buttons = [];
    for(let i = 0; i < props.pageCount; i++) {
        buttons.push(<a className="pagination-button" onClick={props.getOnClick(i + 1)}>{i+1}</a>);
    }
    return (
      <div className="pagination-container">
          {buttons}
      </div>
    );
  }
  
  export default Member;
  