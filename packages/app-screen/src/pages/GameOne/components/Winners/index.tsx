import * as stylex from "@stylexjs/stylex";
import {Html} from "@react-three/drei";
import styles from "./styles.ts";
import {useSnapshot} from "valtio";
import {gameOneAction, gameOneState} from "@/pages/GameOne/store";
import {Award} from "@/types";
import {useState} from "react";
import left from '../../assets/left.png'
import right from '../../assets/right.png'
import zuo from '../../assets/zuo.png'
import you from '../../assets/you.png'
import xian from '../../assets/xian.png'
import {commonStyles} from "@/styles/common.ts";
import {GameStatus} from "@/constants";

export default function Winners() {
  const { awards,people } = useSnapshot(gameOneState)
  const [current,setCurrent] = useState(awards[0])
  const [currentPrize,setCurrentPrize] = useState(0)
  const [show,setShow] = useState(false)
  function choose(e:Award){
    setCurrent(e)
  }
  function change(type:string){
    if(type==='zuo'){
      if(currentPrize===0)
        return
      setCurrentPrize(currentPrize-1)
    }else{
      if(currentPrize===current.prize.length-1)
        return
      setCurrentPrize(currentPrize+1)
    }
  }
  return <Html position={[0, 0, 0]} transform>
    <div
      {...stylex.props(styles.wrapper)}
    >
      <div {...stylex.props(styles.left(left))}>
        <div {...stylex.props(styles.title)}>
          {awards.map((e) => (
            <div {...stylex.props(styles.item(current.id,e.id))} key={e.id} onClick={()=>choose(e as Award)}>{e.title}</div>
          ))}
        </div>
        <div {...stylex.props(styles.pic)}>
          {current?.prize.length>1&&<div {...stylex.props(styles.btn(zuo))} onClick={()=>change('zuo')}/>}
          <div {...stylex.props(styles.img(current.prize[currentPrize].image))} />
          {current?.prize.length>1&&<div {...stylex.props(styles.btn(you))} onClick={()=>change('you')}/>}
        </div>
        <div {...stylex.props(styles.xian(xian))}/>
        <div {...stylex.props(styles.name)}>{current.prize[currentPrize].title}</div>
        <div {...stylex.props(styles.xian(xian))}/>
        <div {...stylex.props(styles.name)}>{current.prize[currentPrize].desc}</div>
      </div>
      <div {...stylex.props(styles.right(right,current.id))}>
        {people.filter((e)=>e.awardId===current.id&&e.prizeId===current.prize[currentPrize].id).map((item)=>{
          return <div key={item.mobile} {...stylex.props(styles.people(current.id))}>
            <div {...stylex.props(styles.headimgurl(item.headimgurl,current.id))} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
              {show&&<div {...stylex.props(styles.delete(current.id))} onClick={()=>gameOneAction.removeWinner(item.openid)}>X</div>}
            </div>
            <div {...stylex.props(styles.username(current.id))}>{item.username}</div>
            <div {...stylex.props(styles.username(current.id))}>{item.mobile.slice(7,11)}</div>
          </div>
        })}
      </div>
      <div {...stylex.props(styles.cancel)}>
        <div {...stylex.props(commonStyles.button(true))} onClick={()=>gameOneAction.changeStatus(GameStatus.OPENING)}>返回</div>
      </div>
    </div>
  </Html>
}
