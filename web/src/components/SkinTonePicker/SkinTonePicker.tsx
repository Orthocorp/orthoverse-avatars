import { GithubPicker } from 'react-color'

const SkinTonePicker = ({ hexColor, colors, setColor }) => {
  return (
    <div>
      <GithubPicker
        color={hexColor}
        onChange={setColor}
        colors={colors}
      />
    </div>
  )
}

export default SkinTonePicker
