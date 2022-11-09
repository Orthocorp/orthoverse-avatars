import ReactSkinview3d from 'react-skinview3d'

const AvatarDisplay = ({skinUrl}) => {
  return (
    <div>
      <ReactSkinview3d
      skinUrl={skinUrl}
      height="500"
      width="500"
      />
    </div>
  )
}

export default AvatarDisplay
