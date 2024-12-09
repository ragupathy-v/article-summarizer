
import axios from 'axios';
import {useState} from 'react';
import { Button,CircularProgress} from '@mui/material';
import './css/article.css'

function Article() {
    const[name,setname]=useState('')
    const[article,setarticle]=useState('')
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState('')

    const getarticle =async()=>{
      setLoading(true)
      const options = {
        method: 'GET',
        url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
        params: {
          url: name,
          lang: 'en',
          engine: '2'
        },
        headers: {
          'x-rapidapi-key': '86fbb4549amsh5bb9871afd65f71p19c0f0jsnba938100bd28',
          'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
        }
      };

      if(!name ){
        setError('Please enter a valid url')
        setLoading(false)
        return;
      }

       try{ 
        
        const res=await axios.request(options)
        console.log(res)
        const data= await res.data.summary
        console.log(data)
        setarticle(data || 'No summary available')
       
       }
       catch(err){
        setError(' Please  enter a valid url.')
        console.log(err)
      
       }
       finally{
        setLoading(false)
       }
    }

  return (
    <>
      
      <input 
      className='input' 
      placeholder='Enter Article Url' 
      onChange={(e)=>setname(e.target.value)}
      />


      <Button 
      variant='outlined' 
      className='btn' 
      disabled={loading}
      onClick={getarticle}
      > get articale</Button>


      <br/>
      {error&& <h6 className='error'>{error}</h6>}
      <div className='outer-article'>
      {loading ? <CircularProgress /> : article && <p className='artcle'>{article}</p>}
      </div>
    </>
  )
}

export default Article