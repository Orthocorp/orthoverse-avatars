import { ChromePicker } from 'react-color'

class ClothesTonePicker extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    background: this.props.hexColor
  }

  handleChange = (color) => {
    this.setState({ background: color.hex });
  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex })
    this.props.setColor(color)
  }

  render() {
    return <div>
      <ChromePicker
        width='200'
        color={ this.state.background }
        onChange={ this.handleChange }
        onChangeComplete={ this.handleChangeComplete }
        disableAlpha={true}
      />
    </div>
  }
}

export default ClothesTonePicker
