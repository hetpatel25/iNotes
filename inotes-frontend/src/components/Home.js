import AddNote from './AddNote'
import Notes from './Notes'

/*This is the Home Page and It has nested components*/
const Home = (props) => {
 const {showAlert} = props;
 return (
    <div>
      <h2>Create Note</h2>
      <Notes showAlert = {showAlert}/>
    </div>
  )
}

export default Home

