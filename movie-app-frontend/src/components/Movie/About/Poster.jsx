import React, { useRef } from 'react'
import Loading from 'components/Loading';
import useModal from 'hooks/useModal';

const Poster = ({ loading, movie }) => {
    const node = useRef(null);
    const [open, toggleOpen] = useModal(node.current);
    const video = useRef(null);

    return (
        <div className='movie-poster'>
            <Loading loading={loading}>
                <img className='movie-poster__img' src={movie.poster} alt={movie.title} />

                <div className='movie-poster__trailer'>
                    <div className={`${open ? 'movie-poster__open' : 'movie-poster__frame'}`} ref={node} onClick={() => toggleOpen(true)}>
                        <iframe
                            ref={video}
                            style={{"pointerEvents": open ? 'all' : 'none'}} 
                            src={`https://www.youtube.com/embed/tgbNymZ7vqY?${open ? 'autoplay=1' : 'autoplay=0'}`}>
                        </iframe>
                    </div>
                </div>
            </Loading>
        </div>
    )
}

export default Poster
