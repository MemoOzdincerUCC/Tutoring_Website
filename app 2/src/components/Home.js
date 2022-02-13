// Create a home page in React. 


import React from 'react'


const Home = () => {
    return (
    <div>
        <div className="home-container">
            <h1 className="home-title">UCC Tutors</h1>
            <img className="icon" src="https://theglassstudio.ca/dir/wp-content/uploads/2018/11/Image-4a-TheGlassStudio-Portfolio.jpg" alt="icon" />

            <a href="/about" className="waves-effect waves-light buttonclass">About</a>
            {/* <img className="paddingy" src="https://i.imgur.com/eMwCYQY.png" alt="brokenpencil" /> */}
        </div>
        <style>
            {`
            .home-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background-image: url("https://i.imgur.com/lH8nSGa.jpg");
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
            }
            .home-title {
                font-size: 5rem;
                text-shadow: 2px 2px black;
                color: #f8f9fa;
                font-family: 'Montserrat', sans-serif;
                /* Make the background span the entire width of the page */
                background-size: cover;
                font-weight: bold;
            }
            .icon {
                width: 175px;
                height: 175px;
                border-radius: 50%;
                /* move up 10px */
                margin-top: -10px;
                margin-bottom: 10px;
            }
            .brokenpencil {
                width: 200px;
                height: 200px;
                border-radius: 50%;
                margin-top: -20px;
            }
            .paddingy {
                padding-top: 75px;
            }
            .buttonclass {
                background-color: #f8f9fa;
                color: black;
                border: none;
                border-radius: 10px;
                padding: 10px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 30px;
                margin: 10px 2px;
                cursor: pointer;
                font-family: 'Montserrat', sans-serif;
                font-weight: bold;
                `}
        </style>
    </div>
    )
}
export default Home;
