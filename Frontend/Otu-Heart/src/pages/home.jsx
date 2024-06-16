

function Home(){
    return (
    <>
    <div className="menu"  style={{
          backgroundImage: '\\images\\doodles.png',
         

        }}>
    <div className="book">

    </div>
   

    <div className="line">

    </div>


    <div className = "circle1">
        
    </div>
    <div className = "theNav1">
    <h2>My Menu</h2>
    <li><a href = "/about">About The App</a></li>
    <li><a href = "/affirmations">Affirmation Cards</a></li>
    <li><a className = "active" href = "/login">Login or Register</a></li>
  </div>
  </div>

    </>
    )
}

export default Home