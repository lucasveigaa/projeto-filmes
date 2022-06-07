import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './filme-info.css'
import { toast } from 'react-toastify'

import api from '../../services/api'

function Filme(){

    const { id } = useParams()
    const navigate = useNavigate()

    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '9e3ebc9ba034cc2bd54e11b4a057507b',
                    language: 'pt-BR',
                }
            })
            .then((response) =>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                navigate("/", { replace: true})
                return
            })
        }
        loadFilme()

        return() => {}}, [navigate, id])

        function salvarFilme(){
            const minhaLista = localStorage.getItem('@meusfilmes')

            let filmesSalvos = JSON.parse(minhaLista) || []

            const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)

            if(hasFilme){
                toast.warn('Esse filme já está na lista')
                return
            }

            filmesSalvos.push(filme)
            localStorage.setItem("@meusfilmes", JSON.stringify(filmesSalvos))
            toast.success("Filme salvo com sucesso!")
        }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando filme...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>

            </div>
        </div>
    )
}

export default Filme;