import { CirclePicker } from 'react-color'

const SkinTonePicker = ({ hexColor, colors, setColor }) => {
  return (
    <div>
      <CirclePicker
        width="200"
        color={hexColor}
        onChange={setColor}
        colors={colors}
      />
    </div>
  )
}

export default SkinTonePicker
