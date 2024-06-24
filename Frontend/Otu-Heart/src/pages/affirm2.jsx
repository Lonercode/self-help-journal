import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery'

function Affirm2(){
    const images = [
        {
            original: "https://i.imgur.com/s0oITeD.png",
            thumbnail: "https://i.imgur.com/s0oITeD.png",
            originalHeight: "400vh"
        },
        {
            original: "https://i.imgur.com/IMa8MCl.png",
            thumbnail: "https://i.imgur.com/IMa8MCl.png",
            originalHeight: "400vh"
        },
        {
            original: "https://i.imgur.com/0sDTFCo.png",
            thumbnail: "https://i.imgur.com/0sDTFCo.png",
            originalHeight: "400vh"
        },
        {
            original: "https://i.imgur.com/2ONRr8b.png",
            thumbnail: "https://i.imgur.com/2ONRr8b.png",
            originalHeight: "400vh"
        },
        {
            original: "https://i.imgur.com/HOMRuME.png",
            thumbnail: "https://i.imgur.com/HOMRuME.png",
            originalHeight: "400vh"
        }
    ]
    
    return (
        <>
        <div className='gallery'>
        <h3>Affirmations &#129496;</h3>
        <ImageGallery items={images} /><br/>
        <a href="/dashboard"><button type="button" id="affirmHome">Dashboard</button></a>
        </div>
        </>
    )
}

export default Affirm2