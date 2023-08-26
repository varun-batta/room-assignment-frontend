import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'

const Home = ({name}) => {
    const [jokesState, setJokesState] = useState({
        jokes: [],
        isJokesError: false,
    })
    const [animeState, setAnimeState] = useState({
        anime: [],
        isAnimeError: false,
    })

    const {jokes, isJokesError} = jokesState
    const {anime, isAnimeError} = animeState

    useEffect(() => {
        fetch('https://official-joke-api.appspot.com/jokes/ten').then((response) => {
            return response.json()
        }).then((responseBody) => {
            setJokesState({
                jokes: responseBody,
                isJokesError: false,
            })
        }).catch((error) => {
            setJokesState({
                jokes: [],
                isJokesError: true,
            })
        })
        fetch('https://kitsu.io/api/edge/anime?page[limit]=5&page[offset]=0', {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
        }).then((response) => {
            return response.json()
        }).then((responseBody) => {
            setAnimeState({
                anime: responseBody.data,
                isAnimeError: false,
            })
        }).catch((error) => {
            setAnimeState({
                anime: [],
                isAnimeError: true,
            })
        })
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 64}}>
            <h2>{`Hello ${name}!`}</h2>
            <div style={{marginLeft: 48}}>
                <h3>Jokes</h3>
                {isJokesError ? (
                    <p style={{color: 'red'}}>Error retrieving jokes!!</p>
                )
                :
                (
                    <div style={{marginLeft: 24}}>
                        {jokes.map((joke) => (
                            <div style={{backgroundColor: 'lightblue', paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, margin: 16, borderRadius: 4, width: '80%'}}>
                                <p style={{fontWeight: '500'}}>{joke.setup}</p>
                                <p style={{fontStyle: 'italic'}}>{joke.punchline}</p>
                            </div>
                        ))}
                    </div>
                )}
                <h3>Anime</h3>
                {isAnimeError ? (
                    <p style={{color: 'red'}}>Error retrieving anime!!</p>
                )
                :
                (
                    <div style={{marginLeft: 24}}>
                        {anime.map((anime) => (
                            <div style={{backgroundColor: 'lightpink', paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, margin: 16, borderRadius: 4, width: '80%'}}>
                                <p style={{fontWeight: '700'}}>{`${anime.attributes.canonicalTitle} (${anime.attributes.averageRating}/100)`}</p>
                                <p style={{fontStyle: 'italic', fontWeight: 500}}>{`${anime.attributes.ageRating} (${anime.attributes.ageRatingGuide})`}</p>
                                <img src={anime.attributes.posterImage.small} />
                                <p>{anime.attributes.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

Home.propTypes = {
    setAuth: PropTypes.string.isRequired
}

export default Home;