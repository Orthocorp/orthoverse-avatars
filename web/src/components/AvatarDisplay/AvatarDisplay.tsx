import { useRef, useEffect } from 'react'

import ReactSkinview3d from 'react-skinview3d'
import {
  IdleAnimation,
  WalkingAnimation,
  RunningAnimation,
  FlyingAnimation,
  SkinViewer,
} from 'skinview3d'

const AvatarDisplay = ({ skinUrl, animation }) => {
  const viewerRef = useRef<SkinViewer>()

  useEffect(() => {
    if (viewerRef.current) {
      if (animation === 'none') {
        viewerRef.current.animation = null
        viewerRef.current.autoRotate = false
      } else {
        // Add an animation
        viewerRef.current.animation = availableAnimations[animation]
        // Enabled auto rotate
        viewerRef.current.autoRotate = true
      }
    }
  }, [animation])

  const availableAnimations = {
    idle: new IdleAnimation(),
    walk: new WalkingAnimation(),
    run: new RunningAnimation(),
    fly: new FlyingAnimation(),
  }

  // const changeAnimation = (animation) => {}

  return (
    <div>
      <ReactSkinview3d
        className="viewer"
        skinUrl={skinUrl}
        height="500"
        width="500"
        onReady={({ viewer }) => {
          viewerRef.current = viewer
        }}
      />
    </div>
  )
}

export default AvatarDisplay
