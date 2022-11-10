import { GithubPicker } from 'react-color'

const SkinTonePicker = ({ hexColor, colors, setSkintone }) => {
  return (
    <div>
      <GithubPicker
        color={hexColor}
        onChange={setSkintone}
        colors={colors}
      />
    </div>
  )
}

export default SkinTonePicker
