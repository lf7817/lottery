import * as stylex from '@stylexjs/stylex'
const animate = stylex.keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})
export default stylex.create({
  wrapper: {
    display:'flex',
    position:'relative'
  },
  left:(url:string)=>({
    width:'498px',
    height:'990px',
    padding:'120px 22px',
    boxSizing:'border-box',
    backgroundImage:`url(${url})`,
    backgroundSize:'100% 100%',
    backgroundRepeat:'no-repeat'
  }),
  right:(url:string,id:string)=>({
    width:'1131px',
    height:'990px',
    marginLeft:'36px',
    boxSizing:'border-box',
    backgroundImage:`url(${url})`,
    backgroundSize:'100% 100%',
    backgroundRepeat:'no-repeat',
    display:'flex',
    justifyContent:'center',
    flexWrap:'wrap',
    alignItems:'center',
    padding:id==='4'?'200px 100px':'300px 0'
  }),
  title:{
    display:'flex',
    justifyContent:'space-around',
  },
  item:(current:string,id:string)=>({
    fontSize:current===id?'36px':'21px',
    fontWeight:current===id?'bold':'normal',
    color:'rgba(252, 230, 184, 1)',
    cursor:'pointer',
    lineHeight:'52px'
  }),
  pic:{
    display:'flex',
    justifyContent:'space-around',
    boxSizing:'border-box',
    margin:'90px 0'
  },
  btn:(url:string)=>({
    width:50,
    height:50,
    marginTop:125,
    cursor:'pointer',
    backgroundImage:`url(${url})`,
    backgroundSize:'100% 100%',
    backgroundRepeat:'no-repeat',
    ':active': {
      transform: 'scale(0.9)',
      boxShadow: '3px 2px 22px 1px rgb(0 0 0 / 24%)',
    },
  }),
  xian:(url:string)=>({
    width:'273px',
    height:9,
    backgroundImage:`url(${url})`,
    backgroundSize:'100% 100%',
    backgroundRepeat:'no-repeat',
    margin:'0 auto'
  }),
  name:{
    width:'100%',
    textAlign:'center',
    fontSize:'24px',
    margin:'35px 0'
  },
  img:(url:string)=>({
    width:'300px',
    height:'300px',
    backgroundImage:`url(${url})`,
    backgroundSize:'cover',
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat',
  }),
  people:(currentPrize:string)=>({
    width:currentPrize==='4'?'120px':'200px',
    height:currentPrize==='4'?'300px':'500px',
    margin:'0 20px'
  }),
  headimgurl:(url:string,currentPrize:string)=>({
    width:currentPrize==='4'?'120px':'200px',
    height:currentPrize==='4'?'120px':'200px',
    borderRadius:'50%',
    backgroundImage:`url(${url})`,
    backgroundSize:'100% 100%',
    backgroundRepeat:'no-repeat',
    marginBottom:'30px',
    position:'relative',
    // border: '4px solid #282828',
    // overflow:'hidden',
    // ':before':{
    //   content:'',
    //   position:'absoulte',
    //   top: '25px',
    //   left: '25px',
    //   right: '25px',
    //   bottom: '25px',
    //   zIndex:10,
    //   background:'#212121',
    //   borderRadius: '50%',
    //   border: '2px solid #292929'
    // }
  }),
  span:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    filter: 'blur(20px)',
    zIndex: -1,
    animation: `${animate} 0.5s linear infinite`,
  },
  delete:(currentPrize:string)=>({
    width:currentPrize==='4'?'120px':'200px',
    height:currentPrize==='4'?'120px':'200px',
    borderRadius:'50%',
    backgroundColor:'#000',
    opacity:'0.5',
    textAlign:'center',
    lineHeight:currentPrize==='4'?'120px':'200px',
    fontSize:currentPrize==='4'?'24px':'36px',
    color:'#fff', 
    fontWeight:'bold',
    cursor:'pointer'
  }),
  username:(currentPrize:string)=>({
    width:'100%',
    textShadow: 'rgba(252, 230, 184, 1) 1px 0 10px',
    fontSize:currentPrize==='4'?'24px':'36px',
    color:'rgba(252, 230, 184, 1)',
    textAlign:'center',
    margin:'10px 0',
  }),
  cancel:{
    position:'absolute',
    top:750,
    left:800
  }
})
