import * as stylex from "@stylexjs/stylex";
import {useNavigate} from "react-router-dom";
import {useGlobalAudioPlayer} from "react-use-audio-player";
import {getAssetPath} from "@/utils";

const styles= stylex.create({
  btn:(url:string)=>( {
    position:'absolute',
    top:730,
    left:200,
    width:'266px',
    height:'54px',
    backgroundImage:`url(${url})`,
    backgroundSize:'cover',
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat',
    cursor:'pointer',
    zIndex:10
  }),
  play:{
    position:'absolute',
    top:20,
    right:20,
    width:100,
    height:100,
    background:'red'
  }
})

export default function Greating(){
  const navigate = useNavigate()
  const { load } = useGlobalAudioPlayer();
  function play(){
    load(getAssetPath('audio/audio1.wav'), {
      autoplay: true
    });
  }
  return <div style={{position:'relative'}}>
    <div {...stylex.props(styles.play)} onClick={play}/>
    <div {...stylex.props(styles.btn(getAssetPath('video/btn.png')))} onClick={()=>navigate('/game-one')}/>
    <video src={getAssetPath('video/great.mp4')} style={{width:'100%',height:'100%'}} controls={false} loop autoPlay muted={true} disablePictureInPicture={false}/>
  </div>
}